var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
	it('should generate correct message object', ()=>{
       var res = generateMessage('Mahaveeer', 'Hi there!!!');
       expect(typeof res.createdAt).toBe('number');
       expect(res).toMatchObject({
       	from : 'Mahaveeer',
        text : 'Hi there!!!'
    });
	});
});

describe('generateLocationMessage', ()=>{
	it('should generate correct location object',()=>{
		var from = 'Admin';
		var latitude = 12;
		var longitude = 13;
		var url = 'https://www.google.com/maps?q=12,13';
        var locres = generateLocationMessage(from, latitude, longitude);
        expect(typeof locres.createdAt).toBe('number');
        expect(locres).toMatchObject({
        	from, url
        });
	});
});