
# js-complex-diceRoller
This is a series of functions to roll dices with complex arguments like explode, keep higher...
Nowadays these commands can do the roll, but it's my second project in JS and the code isn't perfect

# My next steps here are:

- [x] Resolve infinity loop with "1d1exp1";
- [x] Resolve crashes with "1d0" and "0d1";
- [ ] Add somehow to invert the ordering;
- [ ] Improve the code/regex to not be "order sensitive" and understand "5d6!kh3" and "5d6kh3!" as the same thing;
- [ ] Clean and improve the code to be smaller and not harm the eyes;


After all above steps completed, turn this into a NPM library;


# How it works
## English (USA)

This is a code for complex data scrolling, it is still in the process of fixing some bugs and improving the code.

Currently (Mar 18, 2023) it is still with specs in some aspects that should be improved soon;

To use scrolling, just send your arguments to the function "splitDies" in the file, and if all the functions are working as expected, it should respond with scrolling according to your arguments;

Example argument: **"5d6rr2kh10exp6crit5!+2d4+20+2d4exp4!"**

The dice roll follows as follows:

+ [+ -] = As an optional argument in the first die, + or - represents the break between one roll and another making it possible for several different dice to be rolled at once (however, all will be added to the final result);
     If not included in the first set of arguments, a + will automatically be added to it;

+ "xdy" => the basic roll, where x represents the amount of dice to be rolled and y represents the amount of dice faces; one option is to add just one value like "22", in which case the roll will understand it as a fixed value and will add or subtract this value from the final result;

+ "rr#" => Reroll first #, when performing a die roll (such as 2d6rr2) it checks once if the individual value of each die is less than or equal to the argument value; if so, it deletes that value and rerolls the die, thus keeping the second roll value for that die;

+ "[kd][hl]#" => Keep/Discard Higher/Lower #, after rolls checks all rolled dice and keeps (or excludes) the highest (or lowest) values from the result and marks these excluded dice this way: ~~#~~;

+ "exp#" => explode #, after rolling each die, checks if the rolled value is # or greater; If so, it adds this value to the rolled dice and increases the amount of dice to be rolled by +1;

+ "crit#" => critical #, after rolling each die, checks if the rolled value is # or greater; If yes, it marks this value between a pair of asterisks (**#**); An important point is that if the rolled value on a die is equal to the amount of faces (maximum value) it will also be marked like this, but if the rolled value is 1, it will be marked between single asterisks (*#*);

+ "!" => Ordering; If this argument is added, the result will be shown in descending order instead of the order in which the dice were rolled;

## Português(BR)

Este é um código para rolagem complexa de dados, ele ainda está em processo de correção de alguns bugs e melhorias no código.

Atualmente (18/mar/2023) ele ainda está com especifidades em alguns aspectos que devem ser melhorados em breve;

Para utilizar a rolagem, basta enviar seus argumentos para a função "splitDies" no arquivo, e caso todas as funções estejam funcionando da maneira prevista, ele deve responder com uma rolagem de acordo com seus argumentos;

Exemplo de argumento "5d6rr2kh10exp6crit5!+2d4+20+2d4exp4!"

A rolagem de dados segue da seguinte forma:

+ [+ -] => Como argumento opcional no primeiro dado, + ou - representa a quebra entre uma rolagem e outra possibilitando que diversos dados diferentes sejam rolados de uma só vez (porém, todos serão adicionados ao resultado final);
     Caso não seja incluido na primeira série de argumentos, um + será adicionado automaticamente a este;
 + "xdy" => a rolagem básica, onde x representa a quantidade de dados a serem rolados e y representa a quantidade de faces do dado; uma opção é que seja adicionado apenas um valor como "22", neste caso, a rolagem vai entender como valor fixo e vai adicionar ou subtrair este valor do resultado final;
+  "rr#" => Reroll first #, ao realizar uma rolagem de dados (como 2d6rr2) ele verifica uma vez se o valor individual de cada dado é menor ou igual ao valor do argumento; caso sim, ele exclui aquele valor e rerola o dado, mantendo assim o segundo valor de rolagem para aquele dado;
 + "[kd][hl]#" => Keep/Discard Higher/Lower #, após as rolagens verifica todos os dados rolados e mantém (ou exclui) os maiores (ou menores) valores do resultado e marca estes dados excluidos desta forma: ~~#~~;
  + "exp#" => explode #, após a rolagem de cada dado, verifica se o valor rolado é # ou maior; Caso sim, ele adiciona este valor aos dados rolados e aumenta a quantidade de dados a serem rolados em +1;
+ "crit#" => critical #, após a rolagem de cada dado, verifica se o valor rolado é # ou maior; caso sim, ele marca este valor entre um par de asteriscos (**#**);
     Um ponto importante é que caso o valor rolado em um dado seja igual à quantidade de faces (valor máximo) ele também será marcado assim, porém, caso o valor rolado seja 1, ele será marcado entre asteriscos simples (*#*);
+ "!" => Ordering; Caso este argumento seja adicionado, o resultado será mostrado em ordem decrescente em vez de ser mostrado na ordem em que os dados foram rolados;
