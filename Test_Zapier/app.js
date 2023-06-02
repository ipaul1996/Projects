const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'indraindrani1999@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'Indrajit <indraindrani1999@gmail.com>',
            // to: data.email,
            to: "educatorindrajit@gmail.com",
            subject: `Happy ${data.anniversary}th Anniversary from ABC Company!`,
            text: `Dear ${data.name},

            Happy ${data.anniversary}th anniversary! We're delighted to celebrate this special milestone with you as a valued customer of ABC Company. Your support means the world to us, and we're honored to be a part of your journey.
                    
            Thank you for choosing our "Holiday Home" services. We hope that our accommodations have provided you with unforgettable experiences and moments of joy. Your continued trust inspires us to keep delivering exceptional service. Here's to ${data.anniversary} years of cherished memories and to many more incredible anniversaries ahead! We're grateful for the opportunity to serve you and look forward to creating more wonderful moments together.
                  
         Congratulations again, and thank you for being a part of the ABC Company family.
                              
         Best wishes,
         Indrajit Paul
         ABC Company`
          ,
            
        }

        const result = await transport.sendMail(mailOptions);
