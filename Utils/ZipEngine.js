const archiver = require("archiver");
const stream = require("stream");

exports.createZipBuffer = async (files) => {
  const zipStream = new stream.PassThrough();
  const archive = archiver("zip");

  archive.pipe(zipStream);

  for (let f of files) {
    archive.append(f.data, { name: f.name });
  }

  archive.finalize();

  const chunks = [];
  for await (let chunk of zipStream) chunks.push(chunk);

  return Buffer.concat(chunks);
};
