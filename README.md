# Based-Venn-Diagram.
Venn Diagram.

Sample test:

a=[5,16,30,46,19]
b=[15,38,46,28,47]
c=[1,16,34,42,47]
d=[35,39,25,16,17]
e=[45,0,44,2,31]

VennDiagram(a,b,c,d,e)

0: [5, 30, 19] 
1: [15, 38, 28] 
2: [1, 34, 42]
3: [35, 39, 25, 17]
4: [45, 0, 44, 2, 31]
5: []
6: [16]
7: []
8: []
9: [47]
...

A
B
C
D
E
AB
AC
AD
AE
CB
CD
CE
DC
DE
ABC
ABD
ABE
ACD
ACE
ADE
ABCD
ABCE
ABDE
ABCDE



Soccer=["James","Mark","Maxwell","Friedrich"]
Golf=["Donald", "Tyler"]
Shooting=["Muhammad", "Robert", "Jacob"]
Weightlifting=["Tommy", "Jack", "Bob"]
Sprinting=["Mathew", "Mark"]
Boxing=["Manny", "Floyd", "Connor"]
MMA=["Connor", "Mark", "Nick", "Jacob"]
Chess=["Magnus", "Jacob", "Maxwell"]
Bodybuilding=["Max"]

VennDiagram(Soccer,Golf,Shooting,Weightlifting,Sprinting,Boxing,MMA,Chess,Bodybuilding)
