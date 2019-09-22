/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   hangman.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: akraig <akraig@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/09/21 00:12:04 by akraig            #+#    #+#             */
/*   Updated: 2019/09/22 13:35:03 by akraig           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <time.h>
#include "libft.h"

int main()
{
	srand(time(NULL));
	char *str;
	str = "apartment keyboard student sentense";
	char *salut = "                                   .''.       \n       .''.      .        *''*    :_\\/_:     . \n      :_\\/_:   _\\(/_  .:.*_\\/_*   : /\\ :  .'.:.'.\n  .''.: /\\ :   ./)\\   ':'* /\\ * :  '..'.  -=:o:=-\n :_\\/_:'.:::.    ' *''*    * '.\'/.' _\\(/_'.':'.'\n : /\\ : :::::     *_\\/_*     -= o =-  /)\\    '  *\n  '..'  ':::'     * /\\ *     .'/.\'.   '\n      *            *..*         :      *\n	   *         *                *   *\n        *	    *                  *\n";
	char **words = ft_strsplit(str, ' ');
	int word_index = rand() % 4;
	int word_len = ft_strlen(words[word_index]);
	char *guessed_word = (char*)malloc(sizeof(char) * ft_wordlen(words[word_index], ' ', 0));
	int left_letters = word_len;
	for (int i = 0; i < word_len; i++)
		guessed_word[i] = '.';
	char guessed_letter;
	
	while (left_letters)
	{
		printf("\ncurret result:\n%s\n", guessed_word);
		printf("enter a letter\n");
		scanf("%c", &guessed_letter);
		
		if (guessed_letter == '0')
			break ;
		else
		{
			for (int j = 0; j < word_len; j++)
			{
				if (guessed_letter == words[word_index][j])
				{
					guessed_word[j] = guessed_letter;
					left_letters--;
				}
			}
		}
	}
	if(!left_letters)
	{
		printf("%s", salut);
		printf("		  == congratulations! ==\n	       guessed word was \"%s\"\n", words[word_index]);
	}
	else
		printf("see you next time");
	return (0);
}