import stream from '../../lib/stream/index';
import {F, C, N} from '../../lib/parsec/index';
import unit from "../../lib/data/unit";

export default {
    setUp: function (done) {
        done();
    },

    'expect (chain) to be accepted': function (test){

        const lower = C.char('x');

        const upper = F.satisfy( val => val ==='x' );

        const parser  = lower.chain(upper);

        const response = parser.parse(stream.ofString('x'));

        test.ok(response.isAccepted(), 'Should be accepted');

        test.done();

    },
    'expect (chain) to be rejected': function (test){

        const lower = C.char('x');

        const upper = F.satisfy( val => val ==='y' );

        const parser  = lower.chain(upper);

        const response = parser.parse(stream.ofString('x'));

        test.ok(! response.isAccepted(), 'Should be rejected');

        test.done();

    },
    'expect (chain) to be accepted and offset to have move': function (test){

        const lower = C.char('x');

        // satisfy makes the stuff move only if accepted
        const upper = F.satisfy( val => val ==='x' );

        const parser  = lower.chain(upper);

        const response = parser.parse(stream.ofString('x'));

        console.log(response.offset)
        test.ok( response.offset, 'Should be rejected');

        test.done();

    }
/*
    'expect (chain) to be accepted': function (test) {
        test.expect(1);
        // tests here
        var p1 = N.numberLiteral().thenLeft(C.char(' ').opt()),
            p2 = F.any().then(F.any()).thenLeft(F.eos()).map(function (r) {
                return r[0] + r[1];
            });

        test.equal(
            p1.chain(p2).parse(stream.ofString('12 34'), 0).isAccepted(),
            true,
            'should be accepted.'
        );
        test.done();
    },

    'expect (chain) to return 46': function (test) {
        test.expect(1);
        // tests here
        var p1 = N.numberLiteral().thenLeft(C.char(' ').opt()),
            p2 = F.any().then(F.any()).thenLeft(F.eos()).map(function (r) {
                return r[0] + r[1];
            });

        test.equal(
            p1.chain(p2).parse(stream.ofString('12 34'), 0).value,
            46,
            'should be 46.'
        );
        test.done();
    },

    'expect (chain) to fail ': function (test) {
        const token = N.numberLiteral();
        const lex = spaces().drop().debug('start')
            .then(F.any()).debug('any')
            .then(spaces().drop().debug('end'))
            .then(F.any()).debug('any2')
            .map(values => values.array().reduce((acc, n) => {
                    console.log(values, acc, n)
                    return acc + n
                }
                , 0
            ));


        const parsing = token.chain(lex).parse(stream.ofString('10 12 '), 0)

        console.log(parsing.isConsumed())

        test.equal(
            parsing.value,
            20,
            'should be 20.'
        );
        test.done();

    }*/
}

function spaces() {
    return C.charIn(' \r\n\f\t').optrep().map(() => unit);
}