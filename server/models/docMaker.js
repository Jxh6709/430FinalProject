const PizZip = require('pizzip');

const moment = require('moment');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');


const docIt = (body) => {
  let content = fs
    .readFileSync(path.resolve(`${__dirname}/../../`, 'ReturningInPerson.docx'), 'binary');
  if (body.courses[0].isOnline) {
    content = fs
      .readFileSync(path.resolve(`${__dirname}/../../`, 'ReturningOnline.docx'), 'binary');
  }
  if (body.yearsWorked === 0) {
    content = fs
      .readFileSync(path.resolve(`${__dirname}/../../`, 'NewHire.docx'), 'binary');
  }

  const zip = new PizZip(content);

  const doc = new Docxtemplater();
  doc.loadZip(zip);

  doc.setData({
    letter_date: moment(new Date()).format('l'),
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
