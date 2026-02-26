let btn = document.getElementById('button');
btn.addEventListener('click', checkAgePrime);

function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

function isPrime(number) {
    if (number <= 1) {
        return false;
    }

    const limit = Math.sqrt(number)
    for (let i = 2; i <= limit; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

function checkAgePrime() {
    const birthYearInput = document.getElementById('birthYear').value.trim();
    const birthYear = Number(birthYearInput);
    const currentYear = new Date().getFullYear();

    if (birthYearInput === '' || !/^\d{4}$/.test(birthYearInput) || birthYear > currentYear) {
        alert("Please enter a valid birth year.");
        return;
    }

    const age = calculateAge(birthYear);
    const prime = isPrime(age);

    let message = `Your age is: ${age}\n`;

    if (prime) {
        message += age + " is a prime number.";
    } else {
        message += age + " is not a prime number.";
    }

    alert(message);
}