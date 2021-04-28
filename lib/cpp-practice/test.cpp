#include <iostream>

int* makeArray(long size){
  int* boot = (int*)malloc((size + 1) * sizeof(int));
  boot[size] = '\0';
  return boot;
}

void printVar(int* boot, std::string name){
  std::cout
    << name << ": " << boot
    << ", &" << name << ": " << &boot
    << ", *" << name << ": " << *boot
    << std::endl;
}
void printVar(int boot, std::string name){
  std::cout
    << name << ": " << boot
    << ", &" << name << ": " << &boot
    << std::endl;
}

struct BootHawk {
  int maggot;
};

int main(){
  BootHawk mule;
  mule.maggot = 4;
  std::cout << mule.maggot << std::endl;
  // std::cout << **p2 << std::endl;
  return 0;
}