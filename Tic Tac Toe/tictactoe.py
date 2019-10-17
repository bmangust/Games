import random
import re


move = [[0,0,'.'], [0,0,'.']]
#player 1 plays with 'x', player 2 - with 'o'
player = 0
# mode:
# 0 - ai vs ai
# 1 - player vs ai
# 2 - player vs player
mode = 0
i = 0


def generate_random_input():
  random.seed()
  y = random.randint(1, 3)
  x = random.randint(1, 3)
  if player == 0:
    s = 'x'
  else:
    s = 'o'
  res = str(y) + ' ' + str(x) + ' ' + s
  print(res)
  return res


def get_input():
  if mode == 0:
    s = generate_random_input()
  elif mode == 1:
    if player == 0:
      s = input()
    else:
      s = generate_random_input()
  elif mode == 2:
    s = input()
  return s


def print_rules(sel):
  if sel == 0:
    print('''
Hello and welcome to TIC TAC TOE game!
First, please choose game mode:
0 - ai vs ai
1 - player vs ai
2 - player vs player

Game rules:
Goal of the game is to collect 3 'x' or 'o'
in row in any direction.
Players move one by one.

How to choose cells:
  Please enter coordinates and symbol in format:
  row_number col_number symbol
  coordinates should be numbers from 1 to 3
  symbol is 'x' for player 1 and 'o' for player 2

enter 'exit' to quit the game
''')
  elif sel == 1:
    print('''
Please enter coordinates and symbol in format:
row_number col_number symbol
coordinates should be numbers from 1 to 3
symbol is 'x' for player 1 and 'o' for player 2

enter 'exit' to quit the game
      ''')


def choose_mode():
  global mode
  print("""
Choose game mode: 
enter one number 0, 1 or 2 or 'exit'""")
  s = input()
  if re.match(r'^exit$', s):
    print('See you!')
    return 2
  if not re.match(r'[012]', s):
    choose_mode()
  else:
    mode = int(s)
    return 0


def take(player, grid):
    print_board(grid)
    print(f'player {player + 1} move:')
    s = get_input()
    if re.match(r'^exit$', s):
      print('See you!')
      return 2
    if not re.match(r'[1-3] [1-3] [ox]', s):
      print_rules(1)
      return 1
    else:
      move[player] = s.split()
      move[player][0] = int(move[player][0]) - 1
      move[player][1] = int(move[player][1]) - 1
      if (move[player][0] < 0 or move[player][0] > 3 or move[player][1] < 0 or move[player][1] > 3):
        print('please enter coordinates between 1 and 3')
        return 1
      if player == 0 and move[player][2] != 'x':
        print("your symbol is 'x'")
        return 1
      elif player == 1 and move[player][2] != 'o':
        print("your symbol is 'o'")
        return 1
      else:
        if not check_move(player, grid):
          grid[move[player][0]][move[player][1]] = move[player][2]
          return 0
        else:
          print('plese select another cell')
          return 1


def check_move(player, grid):
  if grid[move[player][0]][move[player][1]] == '.':
    return 0
  else:
    return 1


def print_board(grid):
  for row in grid:
    for cell in row:
      print(cell, end='')
    print()


def selector():
  global player
  if player == 0:
    player = 1
  elif player == 1:
    player = 0


def check(grid):
    if ((grid[0][0] == 'x' and grid[0][1] == 'x' and grid[0][2] == 'x') or (grid[1][0] == 'x' and grid[1][1] == 'x' and grid[1][2] == 'x') or (grid[2][0] == 'x' and grid[2][1] == 'x' and grid[2][2] == 'x') or (grid[0][0] == 'x' and grid[1][0] == 'x' and grid[2][0] == 'x') or (grid[0][1] == 'x' and grid[1][1] == 'x' and grid[2][1] == 'x') or (grid[2][0] == 'x' and grid[2][1] == 'x' and grid[2][2] == 'x') or (grid[0][0] == 'x' and grid[1][1] == 'x' and grid[2][2] == 'x') or (grid[0][2] == 'x' and grid[1][1] == 'x' and grid[2][0] == 'x')):
      print(f'player 1 wins!')
      print_board(grid)
      return 1
    elif ((grid[0][0] == 'o' and grid[0][1] == 'o' and grid[0][2] == 'o') or (grid[1][0] == 'o' and grid[1][1] == 'o' and grid[1][2] == 'o') or (grid[2][0] == 'o' and grid[2][1] == 'o' and grid[2][2] == 'o') or (grid[0][0] == 'o' and grid[1][0] == 'o' and grid[2][0] == 'o') or (grid[0][1] == 'o' and grid[1][1] == 'o' and grid[2][1] == 'o') or (grid[2][0] == 'o' and grid[2][1] == 'o' and grid[2][2] == 'o') or (grid[0][0] == 'o' and grid[1][1] == 'o' and grid[2][2] == 'o') or (grid[0][2] == 'o' and grid[1][1] == 'o' and grid[2][0] == 'o')):
      print(f'player 2 wins!')
      print_board(grid)
      return 2
    elif grid[0][0] != '.' and grid[0][1] != '.' and grid[0][2] != '.' and grid[1][0] != '.' and grid[1][1] != '.' and grid[1][2] != '.' and grid[2][0] != '.' and grid[2][1] != '.' and grid[2][2] != '.':
      print('Withdraw!')
      print_board(grid)
      return 3
    else:
      return 0


def check_run_again():
  print('wanna play again? (y/n)')
  dec = input()
  if dec == 'y':
    run_game()
  elif dec == 'n':
    print('See you!')
    return 0
  else:
    print('''
please enter y or n:''')
    check_run_again()


def run_game():
  grid = [['.','.','.'], ['.','.','.'], ['.','.','.']]
  print_rules(0)
  if choose_mode() == 2:
    return
  result = 1
  while (result):
    result = take(player, grid)
    if result == 2:
      break
    elif not result:
      selector()
    result = not check(grid)
  if result != 2:
    check_run_again()


if __name__ == '__main__':
  run_game()
