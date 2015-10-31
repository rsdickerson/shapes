

(function () {
 
 paper.install(window);
 paper.setup('canvas');
 
 window.onload = function() {
 
 
 var palette = new Palette();
 
 var canvasSize = this.view.size;
 var maxSize = Math.min(canvasSize.width, canvasSize.height);
 var center = this.view.center;
 
 background = new Shape.Rectangle(view.bounds);
 background.fillColor = 'white';
 //        background.strokeColor = palette.gray;
 //        background.strokeWidth = 10;
 
 
 var artLayer = new Layer();
 
 var navbar = new Navbar();
 navbar.prevArrowOnClick = function(event) {
 window.location = "/singleSquare.html";
 }
 navbar.nextArrowOnClick = function(event) {
 window.location = "/threeCircles.html";
 }
navbar.draw();
 
 var knobRadius = maxSize * 0.05;
 
 // Ratios are based on knobRadius (i.e. rectangle width = knobRadius * recRatio)
 var recRatio = 10;
 var triangleRatio = 5;
 var cornerRatio = 0.5;
 
 var recSize = recRatio * knobRadius;
 var cornerSize = cornerRatio * knobRadius;
 
 var topLeftCorner = center.subtract(recSize * 0.5, recSize * 0.5);
 var rectangle = new Rectangle(topLeftCorner, new Size(recSize,recSize));
 var path = new Path.Rectangle(rectangle, new Size(cornerSize, cornerSize));
 path.strokeColor = palette.medwood;
 path.strokeWidth = 3;
 path.fillColor = palette.wood;
 
 var puzzle = new Puzzle();
 
 var triangleSize = triangleRatio * knobRadius;
 var triangleCenterOffset = recSize * 0.13;
 var base = new Path.RegularPolygon(new Point(center.x, center.y + triangleCenterOffset), 3, triangleSize);
 base.fillColor = palette.litewood;
 base.strokeWidth = 3;
 base.strokeColor = palette.medwood;
 
 var path = base.clone();
 path.fillColor = 'yellow';
 path.strokeWidth = 3;
 path.strokeColor = 'yellow';
 path.strokeColor.alpha = 0.5;
 path.position = new Point((triangleSize * .9) + 10, (triangleSize * .9) + 10);
 
 var knob = new Path.Circle(new Point(path.position.x, path.position.y + triangleCenterOffset), knobRadius);
 knob.fillColor = palette.medwood;
 knob.strokeWidth = 5;
 knob.strokeColor = palette.litewood;
 
 piece = new Group([path, knob]);
 
 puzzle.addPiece(new PuzzlePiece(piece, base));
 
 var tool = new Tool();
 tool.onMouseDown = function(event) { puzzle.onMouseDown(event); }
 tool.onMouseUp   = function(event) { puzzle.onMouseUp(event); }
 tool.onMouseMove = function(event) { puzzle.onMouseMove(event); }
 tool.onMouseDrag = function(event) {
 puzzle.onMouseDrag(event);
 }
 
 
 view.update();
 }
 })();

