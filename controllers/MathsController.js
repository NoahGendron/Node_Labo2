import Controller from "./Controller.js";
import {handleStaticResourceRequest} from "../staticResourcesServer.js";
import HttpContext from "../httpContext.js";


export default class MathsController extends Controller {
    constructor(HttpContext, repository = null) {
        super(HttpContext, repository);
    }

    get() {
        const queryParams = this.HttpContext.path.params;

      // Pour les exemples
        if (!queryParams.op) {
            this.HttpContext.req.url = "../wwwroot/Maths/example.html";
            handleStaticResourceRequest(this.HttpContext)
            return;
        }
      
        // opérations mathématiques
        switch (queryParams.op) {
            case ' ':
                this.handleAddition(queryParams);
                break;
            case '-':
                this.handleSubtraction(queryParams);
                break;
            case '*':
                this.handleMultiplication(queryParams);
                break;
            case '/':
                this.handleDivision(queryParams);
                break;
            case '%':
                this.handleModulus(queryParams);
                break;
            case '!':
                this.handleFactorial(queryParams);
                break;
            case 'p':
                this.handlePrimality(queryParams);
                break;
            case 'np':
                this.handleNthPrime(queryParams);
                break;
            default:
                this.HttpContext.response.badRequest("Invalid operation.");
                break;
        }
    }

    handleAddition(queryParams) {
        const { x, y } = queryParams;
        if (isNaN(x) || isNaN(y)) {
            let invalidParameters = [];

            if (isNaN(x)) {
                invalidParameters.push('x');
            }

            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '+',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
          let invalidParameters = [];

          if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }
          
          this.HttpContext.response.JSON({
                op: '+',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        } else {
            const result = parseFloat(x) + parseFloat(y);
            this.HttpContext.response.JSON({ op: '+', x, y, value: result });
        }
    }

    handleSubtraction(queryParams) {
        const { x, y } = queryParams;
        if (isNaN(x) || isNaN(y)) {
            let invalidParameters = [];

            if (isNaN(x)) {
                invalidParameters.push('x');
            }

            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '-',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
          let invalidParameters = [];

          if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }
          
          this.HttpContext.response.JSON({
                op: '-',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        }
        else {
            const result = parseFloat(x) - parseFloat(y);
            this.HttpContext.response.JSON({ op: '-', x, y, value: result });
        }
    }

    handleMultiplication(queryParams) {
        const { x, y } = queryParams;
        if (isNaN(x) || isNaN(y)) {
            let invalidParameters = [];

            if (isNaN(x)) {
                invalidParameters.push('x');
            }

            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '*',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        }  else if (!x || !y) {
          let invalidParameters = [];

          if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }
          
          this.HttpContext.response.JSON({
                op: '*',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        }
      else {
            const result = parseFloat(x) * parseFloat(y);
            this.HttpContext.response.JSON({ op: '*', x, y, value: result });
        }
    }

    handleDivision(queryParams) {
        const { x, y } = queryParams;
        if (isNaN(x) || isNaN(y)) {
            let invalidParameters = [];

            if (isNaN(x)) {
                invalidParameters.push('x');
            }

            if (isNaN(y)) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '/',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
          let invalidParameters = [];

          if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }
          
          this.HttpContext.response.JSON({
                op: '/',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')} `
            });
        }
      else {
            const result = parseFloat(x) / parseFloat(y);
            this.HttpContext.response.JSON({ op: '/', x, y, value: result });
        }
    }

    handleModulus(queryParams) {
        const { x, y } = queryParams;

        if (isNaN(x) || isNaN(y) || !Number.isInteger(Number(x)) || !Number.isInteger(Number(y)) || y === 0) {
            let invalidParameters = [];

            if (isNaN(x) || !Number.isInteger(Number(x))) {
                invalidParameters.push('x');
            }

            if (isNaN(y) || !Number.isInteger(Number(y)) || y === 0) {
                invalidParameters.push('y');
            }

            this.HttpContext.response.JSON({
                op: '%',
                x,
                y,
                error: `Invalid parameters: ${invalidParameters.join(', ')}. Must be an Integer`
            });
        } else if (!x || !y) {
          let invalidParameters = [];

          if (!x) {
                invalidParameters.push('x');
            }

            if (!y) {
                invalidParameters.push('y');
            }
          
          this.HttpContext.response.JSON({
                op: '%',
                x,
                y,
                error: `Parameter(s) missing: ${invalidParameters.join(', ')}`
            });
        }
      else {
            const result = parseInt(x) % parseInt(y);
            this.HttpContext.response.JSON({ op: '%', x, y, value: result });
        }
    }

    handleFactorial(queryParams) {
        const { n } = queryParams;
        if (isNaN(n) || !Number.isInteger(Number(n)) || n < 0) {
            this.HttpContext.response.JSON({
                op: '!',
                n,
                error: 'Invalid parameter: n. It must be a non-negative integer.'
            });
        } else if (!n) {
        
          this.HttpContext.response.JSON({
                op: '!',
                n,
                error: `Parameter missing: n`
            });
        }
      else {
            const result = this.factorial(parseInt(n));
            this.HttpContext.response.JSON({ op: '!', n, value: result });
        }
    }

    handlePrimality(queryParams) {
        const { n } = queryParams;
        if (isNaN(n) || !Number.isInteger(Number(n)) || n <= 1) {
            this.HttpContext.response.JSON({
                op: 'p',
                n,
                error: 'Invalid parameter: n. It must be an integer greater than 1.'
            });
        } else if (!n) {
        
          this.HttpContext.response.JSON({
                op: '!',
                n,
                error: `Parameter missing: n`
            });
        } else {
            const result = this.isPrime(parseInt(n));
            this.HttpContext.response.JSON({ op: 'p', n, value: result });
        }
    }

    handleNthPrime(queryParams) {
        const { n } = queryParams;
        if (isNaN(n) || !Number.isInteger(Number(n)) || n <= 0) {
            this.HttpContext.response.JSON({
                op: 'np',
                n,
                error: 'Invalid parameter: n. It must be a positive integer.'
            });
        } else if (!n) {
        
          this.HttpContext.response.JSON({
                op: '!',
                n,
                error: `Parameter missing: n`
            });
        } else {
            const result = this.findNthPrime(parseInt(n));
            this.HttpContext.response.JSON({ op: 'np', n, value: result });
        }
    }

    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * this.factorial(n - 1);
        }
    }

    isPrime(n) {
        if (n <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    findNthPrime(n) {
        let count = 0;
        let num = 2;
        while (count < n) {
            if (this.isPrime(num)) {
                count++;
            }
            num++;
        }
        return num - 1;
    }
}
