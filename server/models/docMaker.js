const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');


const docIt = (body) => {
  const content = fs
    .readFileSync(path.resolve(`${__dirname}/../../`, 'MASTERLETTER.docx'), 'binary');

  const zip = new PizZip(content);

  const doc = new Docxtemplater();
  doc.loadZip(zip);

  doc.setData({
    letter_date: new Date().toISOString().split('T')[0],
    first_name: body.fname,
    Street: body.street,
    city: body.city,
    total_pay: body.Rate_of_Pay * body.courses.length || '1500',
    last_name: body.lname,
    courses: body.courses,
    semester_start_date: body.semStartDate,
    semester_end_date: body.semEndDate,
    first_pay_date: body.firstPayDate,
    last_pay_date: body.lastPayDate,
    due_date: body.dueDate,
  });

  try {
    doc.render();
  } catch (e) {
    console.log('it failed');
    console.error(e);
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // emailIt(buf);
  // fs.writeFileSync(path.resolve(__dirname,`${lname},${fname} Letter.docx`),buf);
  return buf;
};

module.exports = {
  docIt,
};
