function send(){
    const usermsg = document.getElementById('userInput').value;

    const replymsg = [
        'Hello!',
        'How are you?',
        'Nice to meet you!',
        'That sounds interesting!',
        'Tell me more!',
        'I agree!',
        'Let’s talk about it!',
        'That’s a great point!',
        'What do you think?',
        'I love this topic!'
    ];
    const randomIndex = Math.floor(Math.random() * replymsg.length);
    const container = document.querySelector('.chat-box');

    sendUsermsg(usermsg,container);

    sendReplymsg(replymsg[randomIndex],container);

    document.getElementById('userInput').value = '';
}

function sendUsermsg(usermsg,container){
    const msg = document.createElement('div');
    msg.classList.add('user');
    msg.innerHTML = `
        <p >${usermsg}</p>`
    container.appendChild(msg);
    scroll(container);
}

function sendReplymsg(replymsg,container){
    const msg = document.createElement('div');
    msg.classList.add('reply');
    container.appendChild(msg);

    setTimeout(() => {
        msg.innerHTML = `<p>${replymsg}</p>`
    scroll(container);
    }, 1000);
}

function scroll(container){
    container.scrollTop = container.scrollHeight;
}