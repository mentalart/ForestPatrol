# кино: угол обзора камеры в роликах и на выходе из них задаёт режиссёр (late_82_cine_cam.js)
rep("const fov=G.cine&&G.cine.cam?G.cine.fov:55;","const fov=(FIN.fovNow&&FIN.fovNow())||(G.cine&&G.cine.cam?G.cine.fov:55);")
