import { styleText } from 'util'

//função que muda a cor da mensagem do log
export function logColor(...msg: (string | number)[]) {
    const messages = msg
      .map((message) => styleText(['bgGreen', 'whiteBright'], `${message}`))
      .join(' ')
    console.log(styleText('green', messages))
}