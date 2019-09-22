NAME = hangman
CC = gcc
FLAGS = -Wall -Werror -Wextra

all: $(NAME)

$(NAME):
	$(CC) $(FLAGS) hangman.c -L. -lft -o $(NAME)

fclean:
	rm -rf $(NAME)

re: fclean all