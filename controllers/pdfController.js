const { generatePDF } = require("../utils/puppeteerEngine");
const { createZipBuffer } = require("../utils/zipEngine");
exports.singlePDF=async(req,res)=>{
 try{
  const {roll,type}=req.body;
  const pdf=await generatePDF(roll,type);
  res.set({"Content-Type":"application/pdf","Content-Disposition":`attachment; filename="${roll}.pdf"`});
  res.send(pdf);
 }catch(e){res.status(500).send("Single PDF Error");}
};
exports.rangePDF=async(req,res)=>{
 try{
  const {start,end,type}=req.body;
  const prefix=start.match(/\D+/)[0];
  const s=parseInt(start.match(/\d+/)[0]);
  const eN=parseInt(end.match(/\d+/)[0]);
  const width=start.match(/\d+/)[0].length;
  let files=[];
  for(let n=s;n<=eN;n++){
   const roll=prefix+String(n).padStart(width,"0");
   try{
    const pdf=await generatePDF(roll,type);
    files.push({name:`${roll}.pdf`,data:pdf});
   }catch{}
  }
  const zip=await createZipBuffer(files);
  res.set({"Content-Type":"application/zip","Content-Disposition":"attachment; filename=bteup.zip"});
  res.send(zip);
 }catch(e){res.status(500).send("Range PDF Error");}
};
