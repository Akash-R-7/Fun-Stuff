var expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', ()=>{
	it('should reject non-string values', ()=>{
       var s1 = 23132;
        res1 = isRealString(s1);
       expect(res1).toBe(false);
	});
	it('should reject string with only spaces', ()=>{
		res2 = isRealString('   ');
		expect(res2).toBe(false);
	});
	it('should allow string with non-space characters', ()=>{
		res3 = isRealString('Ajay');
		expect(res3).toBe(true);
	});
});

