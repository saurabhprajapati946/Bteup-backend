const { generatePDF } = require("../utils/puppeteerEngine");
const { createZipBuffer } = require("../utils/zipEngine");

exports.singlePDF = async (req, res) => {
  try {
    const { roll, type } = req.body;

    const pdfBuffer = await generatePDF(roll, type);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${roll}.pdf"`
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error generating single PDF");
  }
};

exports.rangePDF = async (req, res) => {
  try {
    const { start, end, type } = req.body;

    const prefix = start.match(/\D+/)[0];
    const sNum = parseInt(start.match(/\d+/)[0]);
    const eNum = parseInt(end.match(/\d+/)[0]);
    const width = start.match(/\d+/)[0].length;

    const files = [];

    for (let n = sNum; n <= eNum; n++) {
      const roll = prefix + String(n).padStart(width, "0");

      try {
        const pdf = await generatePDF(roll, type);
        files.push({ name: `${roll}.pdf`, data: pdf });
      } catch {
        console.log("Skipping:", roll);
      }
    }

    const zip = await createZipBuffer(files);

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=bteup_cards.zip"
    });

    res.send(zip);
  } catch (err) {
    console.log(err);
    res.status(500).send("Range PDF error");
  }
};
