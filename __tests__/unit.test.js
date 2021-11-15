// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');

// TODO - Part 2

// 1. isPhone true 1
test('tests valid phone number: (555)123-4567', () => {
    const isValid = functions.isPhoneNumber('(555)123-4567');
    expect(isValid).toBe(true);

});

// 2. isPhone true 2
test('tests valid phone number without parentheses: 111111-1111', () => {
    const isValid = functions.isPhoneNumber('111111-1111');
    expect(isValid).toBe(true);

});

// 3. isPhone false 1
test('tests short, invalid phone number: 1', () => {
    const isValid = functions.isPhoneNumber('1');
    expect(isValid).toBe(false);

});

// 4. isPhone false 2
test('tests long, invalid phone number: 99999999999999999999999', () => {
    const isValid = functions.isPhoneNumber('99999999999999999999999');
    expect(isValid).toBe(false);

});

// 5. isEmail true 1
test('tests valid email: unn002@ucsd.edu', () => {
    const isValid = functions.isEmail('unn002@ucsd.edu');
    expect(isValid).toBe(true);

});

// 6. isEmail true 2
test('tests valid email: ladygaga9595@gmail.com', () => {
    const isValid = functions.isEmail('ladygaga9595@gmail.com');
    expect(isValid).toBe(true);

});

// 7. isEmail false 1
test('tests invalid email without @: zooweemama', () => {
    const isValid = functions.isEmail('zooweemama');
    expect(isValid).toBe(false);

});

// 8. isEmail false 2
test('tests invalid email with white space: all too well @ gmail.com', () => {
    const isValid = functions.isEmail('all too well @ gmail.com');
    expect(isValid).toBe(false);

});

// 9. isStrongPassword true 1
test('tests valid strong password: ASDF_1234', () => {
    const isValid = functions.isStrongPassword('ASDF_1234');
    expect(isValid).toBe(true);

});
// 10. isStrongPassword true 2
test('tests valid strong password: A1234567890', () => {
    const isValid = functions.isStrongPassword('A1234567890');
    expect(isValid).toBe(true);

});
// 11. isStrongPassword false 1
test('tests invalid password that is too long: ASDFghjklqwertyuiopzxcvbnm', () => {
    const isValid = functions.isStrongPassword('ASDFghjklqwertyuiopzxcvbnm');
    expect(isValid).toBe(false);

});

// 12. isStrongPassword false 2
test('tests invalid password that uses !: Abcdefghijk!', () => {
    const isValid = functions.isStrongPassword('Abcdefghijk!');
    expect(isValid).toBe(false);

});

// 13. isDate true 1
test('tests valid date: 1/2/2000', () => {
    const isValid = functions.isDate('1/2/2000');
    expect(isValid).toBe(true);

});

// 14. isDate true 2
test('tests valid date: 12/22/2000', () => {
    const isValid = functions.isDate('1/2/2000');
    expect(isValid).toBe(true);

});

// 15. isDate false 1
test('tests invalid date with short year: 12/22/00', () => {
    const isValid = functions.isDate('12/22/00');
    expect(isValid).toBe(false);

});
// 16. isDate false 2
test('tests invalid date with short year: 1/22/99', () => {
    const isValid = functions.isDate('1/22/95');
    expect(isValid).toBe(false);

});
// 17. isHexColor true 1
test('tests valid 3 digit hex code: #000', () => {
    const isValid = functions.isHexColor('#000');
    expect(isValid).toBe(true);

});
// 18. isHexColor true 2
test('tests valid 6 letter hex code: #FFFfff', () => {
    const isValid = functions.isHexColor('#FFFfff');
    expect(isValid).toBe(true);

});

// 19. isHexColor false 1
test('tests invalid 4 character hex code: #1234', () => {
    const isValid = functions.isHexColor('#1234');
    expect(isValid).toBe(false);

});
// 20. isHexColor false 2
test('tests invalid 6 character hex code: #ZZZZZZ ', () => {
    const isValid = functions.isHexColor('#ZZZZZZ');
    expect(isValid).toBe(false);

});