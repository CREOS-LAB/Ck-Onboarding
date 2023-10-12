const sendTeacherSignUpDetailsHTML = (email: string, password: string, schoolName: string)=>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-family: arial;
        }

        p{
            color: rgb(100,100,100);
        }

        div{
            padding: 10px 0;
        }
    </style>
</head>
<body>
    <img src="https://res.cloudinary.com/devemmy/image/upload/v1696531268/bx6sdi25go6d2ecfzipi.png" alt="">
    <h3>Welcome to Curious Kids</h3>

    <p> <b>You've been invited to join CuriousKidz as a Teacher</b> </p>
    <p>
        Here are your login details:
    </p>
    <p>
        Email: ${email}
    </p>

    <p>
        Password: ${password}
    </p>
    <p>click here to <a href="https://ck-kids-dashboard.vercel.app/teachers-signin"> login </a> </p>

    <div>
        <p>
            Best Regards,
        </p>
        <p>
            ${schoolName}
        </p>
        <p>
            CuriousKids Team.
        </p>
    </div>

</body>
</html> 
    `
}

const sendInviteToStudentHTML = (email: string, productKey: string, schoolName: string)=>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-family: arial;
        }

        p{
            color: rgb(100,100,100);
        }

        div{
            padding: 10px 0;
        }
    </style>
</head>
<body>
    <img src="https://res.cloudinary.com/devemmy/image/upload/v1696531268/bx6sdi25go6d2ecfzipi.png" alt="">
    <h3>Welcome to Curious Kids</h3>

    <p> <b>You've been invited to join CuriousKidz as a Student</b> </p>
    <p>
        Here are your details:
    </p>
    <p>
        Email: ${email}
    </p>

    <p>Product Key: ${productKey} </p>

    <p>click here to <a href="https://ck-kids-dashboard.vercel.app/teachers-signin"> get started </a> </p>

    <div>
        <p>
            Best Regards,
        </p>
        <p>
            ${schoolName}
        </p>
        <p>
            CuriousKids Team.
        </p>
    </div>

</body>
</html> 
    `
}

const sendMessageFromWebsiteToAdminMailHTML = (details: any)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body{
                font-family: arial;
            }
    
            p{
                color: rgb(100,100,100);
            }
    
            div{
                padding: 10px 0;
            }
        </style>
    </head>
    <body>
        <img src="https://res.cloudinary.com/devemmy/image/upload/v1696531268/bx6sdi25go6d2ecfzipi.png" alt="">
        <h3>Subject: New Inquiry from CuriousKidz Website</h3>
    
        <p> <b>Dear CuriousKidz Team</b> </p>
        <p>
            You have received a new message via the Contact Us page on curiouskidz website. The details of the inquiry are as follows:
        </p>

                <div>
                    <h3> ${details.firstName} Just sent a message to you </h3>
                    <p> user's email: ${details.email} </p>
                    <p> Message: <b>${details.message}</b> </p>
                </div>
    
        <div>
            <p>
                Please review this inquiry at your earliest convenience and respond accordingly. The sender is expecting a response within [Specify Timeframe, e.g., 24-48 hours], so timely attention to this matter is appreciated.
            </p>
        </div>
    
    </body>
    </html>
    `
}

const sendResetPasswordHTML = (email: string, token: string, type: number)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            body{
                font-family: arial;
            }
    
            p{
                color: rgb(100,100,100);
            }
    
            div{
                padding: 10px 0;
            }
        </style>
    </head>
    <body>
        <img src="https://res.cloudinary.com/devemmy/image/upload/v1696531268/bx6sdi25go6d2ecfzipi.png" alt="">
        <h3>Reset Password</h3>
    
        <div>
                    <h3> Reset Password </h3>
                    <p> Click <a href="https://ck-kids-dashboard.vercel.app/set-password?token=${token}&type=${type}" target="_blank" >here</a> to reset your password </p>
        </div>
    
    </body>
    </html>
    `
}

const sendSchoolSignUpDetailsHTML = (email: string, password: string, productKey: string)=>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-family: arial;
        }

        p{
            color: rgb(100,100,100);
        }

        div{
            padding: 10px 0;
        }
    </style>
</head>
<body>
    <img src="https://res.cloudinary.com/devemmy/image/upload/v1696531268/bx6sdi25go6d2ecfzipi.png" alt="">
    <h3>Welcome to Curious Kids</h3>

    <p> <b>You've been invited to join CuriousKidz as a Teacher</b> </p>
    <p>
        Here are your login details:
    </p>
    <p>
        Email: ${email}
    </p>

    <p>
        Password: ${password}
    </p>

    <p>
        Product Key: ${productKey}
    </p>
    <p>click here to <a href="https://ck-kids-dashboard.vercel.app/teachers-signin"> login </a> </p>

    <div>
        <p>
            Best Regards,
        </p>
        <p>
            CuriousKids Team.
        </p>
    </div>

</body>
</html> 
    `
}

export {sendInviteToStudentHTML, sendMessageFromWebsiteToAdminMailHTML, sendResetPasswordHTML, sendSchoolSignUpDetailsHTML, sendTeacherSignUpDetailsHTML}