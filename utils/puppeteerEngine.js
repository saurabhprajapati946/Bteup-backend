const puppeteer=require("puppeteer");
const config=require("../config");
exports.generatePDF=async(roll,type)=>{
 const url=config.baseURLs[type]+roll;
 const browser=await puppeteer.launch({
  headless:"new",
  args:["--no-sandbox","--disable-gpu"]
 });
 const page=await browser.newPage();
 await page.goto(url,{waitUntil:"networkidle2",timeout:config.timeout});
 const check=await page.evaluate(()=>document.body.innerText);
 if(check.length<100){await browser.close();throw new Error("Invalid Page");}
 const pdf=await page.pdf({format:"A4",printBackground:true});
 await browser.close();
 return pdf;
};
