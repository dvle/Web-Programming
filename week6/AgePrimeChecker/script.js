function calculateAge(yob) {
    const today = new Date();
    const birthYear = new Date(yob);

    let age = today.getFullYear() - birthYear.getFullYear();
    return age;
}

function isPrime(number) {
    if (number <= 1 || number % 2 === 0) {
        return false;
    }
    if(number === 2 ) {
        return true;
    }

    const limit = Math.sqrt(number)
}

function checkAgePrime() {

}