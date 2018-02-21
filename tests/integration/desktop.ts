const { suite, test, before } = intern.getInterface('tdd');
const { assert } = intern.getPlugin('chai');

suite('desktop', () => {
    before(({ remote }) => {
        return remote
            .get('_dist/javascript/desktop.html')
            .sleep(3000)
            // .setFindTimeout(5000)
            // .findDisplayedByCssSelector('body.loaded')
        ;
    });

    test('Typing indicator when user types.', ({ remote }) => {
        return remote
            .setFindTimeout(35000)
            .findById('message-to-send')
            .type('Howdy ChatEngine users!')
            .end()

            .findById('typing')
            .getVisibleText()
            .then((text) => {
                console.log({text});
                assert.isAbove(text.indexOf('is typing...'), 0);
            })
            .sleep(3000)
            .getVisibleText()
            .then((text) => {
                assert.equal(text, '');
            })
            .end();
    });

    test('User sending a message to a chatroom.', ({ remote }) => {
        return remote
            .findById("send-button")
            .then((res) => {
                // console.log(res);
                return res;
            })
            .click()
            .end()

            .findById('message-to-send')
            .getVisibleText()
            .then((text) => {
                assert.equal(text, '');
            })
            .end()


            // Find newly published msg and validate text within
            .findAllByClassName('other-message')
            .then((items) => {
                items.forEach((item) => {
                    item.getVisibleText()
                    .then((text) => {
                        assert.equal(text, 'Howdy ChatEngine users!')
                    });
                });
                'body > div > div.chat > div.chat-history > ul > li:nth-child(2) > div.message.my-message'
                'body > div > div.chat > div.chat-history > ul > li:nth-child(5) > div.message.my-message'
            })
            .end();
    });
});
