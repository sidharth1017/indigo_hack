const hashService = require("./hashService");
const otpService = require('./otpService');
const userService = require('./userService');

class AuthService {
    async userLogin(req, res) {
        const { phone, email } = req.body;
        const phoneEmail = phone || email;

        if(!phoneEmail){
            return res.status(400).json({message: 'Phone no. or email is required!'})
        }

        const otp = await otpService.generateOtp();     
        const ttl = 1000 * 60 * 5;
        const expires = Date.now() + ttl;
        const data = `${phoneEmail}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        try{
            if (email){
                await otpService.sendByMail(email, otp);
            }else {
                // await otpService.sendBySms(phone, otp);
            }

            return res.status(200).json({
                hash: `${hash}.${expires}`,
                phone,
                email,
            })
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: 'Message sending failed'})
        }
    }

    async verifyUser(req, res) {
        const { otp, hash, phone, email } = req.body;
        console.log(email, phone, "test")
        const phoneEmail = phone || email;
    
        if (!otp || !hash || !phoneEmail) {
            return res.status(400).json({ message: "All fields are required!" });
        }
    
        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            return res.status(400).json({ message: 'OTP expired!' });
        }
    
        const data = `${phoneEmail}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
    
        if (!isValid) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    
        let user;
    
        try {
            console.log("user")
            user = await userService.findUser({email});
            console.log(user, "userrr");
    
            if (!user) {
                const activated = true;
                user = await userService.createUser({ email, phone, activated });
            }
        } catch (err) {
            console.log(err, "err")
            return res.status(500).json({ message: 'Db Error' });
        }
    
        return res.json({ user: user, auth: true });
    }   
}
module.exports = new AuthService();
