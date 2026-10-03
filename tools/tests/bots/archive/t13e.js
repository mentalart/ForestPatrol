U.go();ZC.loadLevel(4);ZC.tick(10);ZC.skip();ZC.tick(5);const S=ZC.W.song;const a=S.lane[0];ZC.press('KeyA');ZC.tick(1);const b=S.lane[0];ZC.tick(20);const x=U.act(0).pos.x;ZC.press('KeyD');ZC.tick(1);ZC.press('KeyD');ZC.tick(20);
[a,b,x.toFixed(2),S.lane[0],U.act(0).pos.x.toFixed(2),S.state].join(' ')
