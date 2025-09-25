const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //이메일 유효성 검사 정규식

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [EMAIL_REGEX, "유효한 이메일"]
        },
        passwordHash: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            trim: true,
            default: ""
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            index: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isLoggined: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

//비밀번호가 맞는 지 확인
userSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.passwordHash)
}

//보안상 안전하게 json을 반환하는 뭐시기..
userSchema.methods.toSafeJSON = function () {
    const obj = this.toObject({ vwesionKey: false })
    delete obj.passwordHash
    return obj
}

userSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('User', userSchema);