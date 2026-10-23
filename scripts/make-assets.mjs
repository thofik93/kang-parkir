// Membuat gambar sumber ikon dan splash tanpa dependensi: rambu parkir "P" dengan strip rompi.
// Hasilnya dipakai `capacitor-assets generate` untuk semua ukuran Android dan iOS.
import { mkdirSync, writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const OUT = new URL('../assets/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = buf => { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(size, pixel, ss) {
  const stride = size * 4 + 1, raw = Buffer.alloc(size * stride);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < ss; sy++) for (let sx = 0; sx < ss; sx++) {
        const c = pixel((x + (sx + 0.5) / ss) / size, (y + (sy + 0.5) / ss) / size);
        r += c[0] * c[3]; g += c[1] * c[3]; b += c[2] * c[3]; a += c[3];
      }
      const o = y * stride + 1 + x * 4;
      raw[o] = a ? r / a : 0; raw[o + 1] = a ? g / a : 0; raw[o + 2] = a ? b / a : 0; raw[o + 3] = a / (ss * ss) * 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

const BLUE = [18, 58, 140, 1], WHITE = [246, 247, 251, 1], VEST = [255, 122, 26, 1], REFLECT = [230, 242, 90, 1], NONE = [0, 0, 0, 0];

function inRound(x, y, x0, y0, x1, y1, r) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = Math.min(Math.max(x, x0 + r), x1 - r), cy = Math.min(Math.max(y, y0 + r), y1 - r);
  return Math.hypot(x - cx, y - cy) <= r;
}

/** Rambu P di tengah area 0..1, `s` = lebar rambu relatif terhadap kanvas. */
function sign(u, v, s, bg) {
  const x = (u - 0.5) / s + 0.5, y = (v - 0.5) / s + 0.5;
  if (!inRound(x, y, 0, 0, 1, 1, 0.16)) return bg;
  if (!inRound(x, y, 0.05, 0.05, 0.95, 0.95, 0.12)) return WHITE;
  // strip rompi di bawah
  if (y > 0.8) return y > 0.85 && y < 0.89 ? REFLECT : VEST;
  // huruf P: batang + mangkuk (persegi yang ujung kanannya setengah lingkaran, berlubang)
  const d = Math.hypot(x - 0.5, y - 0.37);
  const stem = x >= 0.27 && x <= 0.42 && y >= 0.16 && y <= 0.74;
  const outer = (x >= 0.27 && x <= 0.5 && y >= 0.16 && y <= 0.58) || (x > 0.5 && d <= 0.21);
  const hole = (x >= 0.42 && x <= 0.5 && y >= 0.29 && y <= 0.45) || (x > 0.5 && d <= 0.08);
  return stem || (outer && !hole) ? WHITE : BLUE;
}

const write = (name, size, fn, ss) => { writeFileSync(new URL(name, OUT), png(size, fn, ss)); console.log('assets/' + name); };
write('icon-only.png', 1024, (u, v) => sign(u, v, 1.0, BLUE), 2);
write('icon-foreground.png', 1024, (u, v) => sign(u, v, 0.62, NONE), 2);
write('icon-background.png', 1024, () => BLUE, 1);
write('splash.png', 2732, (u, v) => sign(u, v, 0.22, BLUE), 1);
write('splash-dark.png', 2732, (u, v) => sign(u, v, 0.22, BLUE), 1);
