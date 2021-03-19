#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
// 0 -> 2 process
// 2 -> 4
// 4 -> 8
int main(void){
  int i = 0;
  printf("Process id 1 %d\n", getpid());
  for (i = 0; i <= 4; i++){
    printf("Process id 2 %d\n", getpid());
    // printf("i top %d\n", i);
    if (i % 2 == 0) {
      // printf("i bottom: %d\n", i);
      fork();
    }
    printf("Process id 3 %d\n", getpid());
    printf("foo\n");
  }
  printf("Process id 4 %d\n", getpid());
  return 0;
}

int arr [40];

int merge_sort() {

}
