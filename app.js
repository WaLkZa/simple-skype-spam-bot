Skyweb = require('skyweb');

async function run() {
    const userCredential = {
        loginName: "type_your_login_name",
        password: "type_your_password"
    };

    const msgContent = "Hi. I'am simple skype spam bot!'";

    const skyweb = new Skyweb.default();
    await skyweb.login(userCredential.loginName, userCredential.password);

    let currentIndex = 0;
    const contacts = skyweb.contactsService.contacts;

    const runNext = () => {
        const currentContact = contacts[currentIndex];

        if (currentContact) {
            setTimeout(() => {
                skyweb.sendMessage(currentContact.person_id, msgContent);
                
                console.log(`${currentIndex + 1} message from ${contacts.length} has been sent.`)
                
                currentIndex++;
                
                runNext()
            }, 500)
        } else {
            process.exit();
        }
    }
    runNext();
}

run();