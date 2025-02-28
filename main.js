const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const skills = [
    " Easy       | Rhetorical Synthesis",
    " Easy       | Percentages",
    " Easy       | Lines, angles, and triangles",
    " Easy       | Linear functions",
    " Easy       | Right triangles and trigonometry",
    " Easy       | Words in Context",
    " Easy       | One-variable data: Distributions and measures of center and spread",
    " Easy       | Probability and conditional probability",
    " Easy       | Inferences",
    " Easy       | Boundaries",
    " Easy       | Linear equations in one variable",
    " Easy       | Ratios, rates, proportional relationships, and units",
    " Easy       | Inference from sample statistics and margin of error",
    " Easy       | Linear inequalities in one or two variables",
    " Easy       | Evaluating statistical claims: Observational studies and experiments",
    " Easy       | Area and volume",
    " Easy       | Form, Structure, and Sense",
    " Easy       | Linear equations in two variables",
    " Easy       | Two-variable data: Models and scatterplots",
    " Easy       | Circles",
    " Easy       | Cross-Text Connections",
    " Easy       | Central Ideas and Details",
    " Easy       | Systems of two linear equations in two variables",
    " Easy       | Nonlinear functions",
    " Easy       | Text Structure and Purpose",
    " Easy       | Transitions",
    " Easy       | Equivalent expressions",
    " Easy       | Command of Evidence",
    " Easy       | Nonlinear equations in one variable and systems of equations in two variables",
    " Hard       | Linear equations in one variable",
    " Hard       | Right triangles and trigonometry",
    " Hard       | Linear functions",
    " Hard       | Circles",
    " Hard       | Command of Evidence",
    " Hard       | Evaluating statistical claims: Observational studies and experiments",
    " Hard       | Percentages",
    " Hard       | Systems of two linear equations in two variables",
    " Hard       | Linear equations in two variables",
    " Hard       | Linear inequalities in one or two variables",
    " Hard       | Equivalent expressions",
    " Hard       | Nonlinear equations in one variable and systems of equations in two variables",
    " Hard       | Ratios, rates, proportional relationships, and units",
    " Hard       | Words in Context",
    " Hard       | Area and volume",
    " Hard       | Cross-Text Connections",
    " Hard       | One-variable data: Distributions and measures of center and spread",
    " Hard       | Nonlinear functions",
    " Hard       | Rhetorical Synthesis",
    " Hard       | Central Ideas and Details",
    " Hard       | Inferences",
    " Hard       | Lines, angles, and triangles",
    " Hard       | Boundaries",
    " Hard       | Transitions",
    " Hard       | Inference from sample statistics and margin of error",
    " Hard       | Two-variable data: Models and scatterplots",
    " Hard       | Form, Structure, and Sense",
    " Hard       | Text Structure and Purpose",
    " Hard       | Probability and conditional probability",
    " Medium     | Text Structure and Purpose",
    " Medium     | Two-variable data: Models and scatterplots",
    " Medium     | Cross-Text Connections",
    " Medium     | Central Ideas and Details",
    " Medium     | Nonlinear equations in one variable and systems of equations in two variables",
    " Medium     | Linear equations in one variable",
    " Medium     | Command of Evidence",
    " Medium     | One-variable data: Distributions and measures of center and spread",
    " Medium     | Linear functions",
    " Medium     | Probability and conditional probability",
    " Medium     | Rhetorical Synthesis",
    " Medium     | Equivalent expressions",
    " Medium     | Inferences",
    " Medium     | Systems of two linear equations in two variables",
    " Medium     | Circles",
    " Medium     | Right triangles and trigonometry",
    " Medium     | Percentages",
    " Medium     | Words in Context",
    " Medium     | Form, Structure, and Sense",
    " Medium     | Ratios, rates, proportional relationships, and units",
    " Medium     | Evaluating statistical claims: Observational studies and experiments",
    " Medium     | Nonlinear functions",
    " Medium     | Inference from sample statistics and margin of error",
    " Medium     | Boundaries",
    " Medium     | Linear inequalities in one or two variables",
    " Medium     | Area and volume",
    " Medium     | Lines, angles, and triangles",
    " Medium     | Linear equations in two variables",
    " Medium     | Transitions",
];


// ... (skills array remains the same) ...

let weights = [];
let net_wrong = [];

// Initialize arrays
for (let i = 0; i < skills.length; i++) {
    weights.push(1.0 / skills.length);
    net_wrong.push(0);
}

function f(x) {
    return (2 / skills.length) / (1 + Math.exp(-x / 3));
}

async function methane(message) {
    return new Promise((resolve) => {
        rl.question(message, (answer) => {
            const input = parseInt(answer);
            
            // Validate input
            if (isNaN(input) || input < 0 || input >= skills.length) {
                console.log(`Please enter a number between 0 and ${skills.length - 1}`);
                resolve(false);
                return;
            }

            // Update weights
            net_wrong[input]++;
            const oldWeight = weights[input];
            weights[input] = f(net_wrong[input]);

            // Adjust other weights
            for (let i = 0; i < weights.length; i++) {
                if (i !== input) {
                    weights[i] -= ((weights[input] - oldWeight) / skills.length);
                }
            }
            resolve(true);
        });
    });
}

async function main() {
    while (true) {
        await methane(`Enter an integer between 0 and ${skills.length - 1} inclusive: `);
        console.log('Weights updated. Current weights:', weights);
    }
}

// Start the program
main().catch(console.error).finally(() => rl.close());
