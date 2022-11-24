const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hocsinhSchema = new Schema({
  normalInfo: {
    studenInfo: {
      _id: Schema.Types.ObjectId,
      name: String,
      phoneNum: Number,
      School: String, //cai array ma em bao y, thi trong code se lam, chu khong tao luon o day
      class: String,
      mail: String, //fn mail laf gi co?
      address: String,
      fbLink: String,
      birthday: Date, //sao thieu ngay sinh the
    },
    parentInfo: {
      momName: String,
      momPhoneNum: Number,
      momMail: String,
      dadName: String,
      dadPhoneNum: Number,
      dadMail: String,
      note: String,
    },
  },
  studyInfo: {
    AP: {
      GPA: Number,
      SAT: {
        //sat = math + english
        math: Number,
        english: Number,
      },
      ACT: {
        //act = math + english + science
        math: Number,
        english: Number,
        science: Number,
      },
      ielts: {
        reading: Number,
        writing: Number,
        listening: Number,
        speaking: Number,
      },
    },
    achievement: {
      award: [String],
      competition: [String],
      activity: [String],
    },
  },
  EAInfo: {
    //ngoai khoa
    EAAcare: [String],
    club: [String],
    EAATrip: [String],
  },
  moneyInfo: {
    course: [
      {
        corseName: String,
        courseFee: Number,
      },
    ],
    money: Number,
    Mentor: Array,
  },
  saleInfo: {
    //cai nay hoi kho hieu nha
    saleLog: [String],
    saleStatus: {
      type: String,
      enum: ["đang theo dõi", "đang chờ", "đã ký", "đã hoàn thành", "đã hủy"],
    },
  },
  Aim: {
    dreamSchool: [String],
    dreamMajor: [String],
    country: [String],
    availableSchool: [String],
    finance: Number,
  },
  howImportant: {
    careRank: {
      type: String,
      enum: [
        "A-VVIP",
        "B-VIP",
        "C-Important",
        "D-Normal",
        "E-Not Important",
        "F-Hamloz",
      ],
      default: "D-Normal",
    },
  },
});

hocsinhSchema.virtual("moneyPaid").get(function () {
  return this.moneyInfo.course.reduce((a, b) => a.courseFee + b.courseFee, 0);
});

hocsinnhSchema.virtual("aimSchool").get(function () {
  aimSchool = this.Aim.availableSchool.filter((school) => {
    return this.Aim.dreamSchool.includes(school);
  });
  return aimSchool;
});
