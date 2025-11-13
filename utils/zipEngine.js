const archiver=require("archiver");
const stream=require("stream");
exports.createZipBuffer=async(files)=>{
 const pass=new stream.PassThrough();
 const zip=archiver("zip");
 zip.pipe(pass);
 files.forEach(f=>zip.append(f.data,{name:f.name}));
 zip.finalize();
 const chunks=[];
 for await(const ch of pass) chunks.push(ch);
 return Buffer.concat(chunks);
};