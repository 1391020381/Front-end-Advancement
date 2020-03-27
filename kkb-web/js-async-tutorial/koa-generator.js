let info = ''

function * g1(){
    info += '1'
    yield * g2() // info = '1234'
    info +='5' // info = '12345'
}

function * g2(){ info = '1'
    info +='2'   // info = '12'
    yield * g3() // info = '123'
    info += '4'  // info = '1234'
}

function * g3(){ info = '12'
    info +='3'  // info = '123'
}

var g = g1()
g.next()