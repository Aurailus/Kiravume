let sketch = function(p) {
	const BS = 32;
	const BO = 16;

	const LO = BS;
	const SO = BS;
	const LW = BS;
	const LH = BS * 2;

	let offset;
	let input;

	function updateData() {
		p.redraw();
	}

	p.setup = function() {
		p.createCanvas(document.getElementById("root").offsetWidth - 4, BO * 2 + LH);
    p.noLoop();

		input = document.getElementById('input');
		input.addEventListener('change', updateData);
		input.addEventListener('input', updateData);
	}

	p.draw = function() {
		offset = BO;
    p.background(255);

		let chars = input.value.split('').map(m => m.toLowerCase());
		chars.forEach((c, i) => renderCharacter(c, chars[Math.min(i + 1, chars.length - 1)]));
	}

	function renderCharacter(char, next) {
		p.strokeWeight(4);
		p.stroke('#243b53')
		let nextShape = 'i';

		switch (next) {
		case 'u': case 'e':
			nextShape = 'o';
			break;
		}

		switch (char) {
		case ' ':
			break;
		
		case 'a': case 'i':
			p.line(offset + LW, BO, offset, BO + LH);

			switch (char) {
			case 'i':
				p.line(offset, BO + LH / 2, offset, BO + LH);
				break;

			case 'a':
				p.line(offset, BO + LH, offset + LW, BO + LH);
				break;
			}

			break;

		case 'u': case 'e':
			p.line(offset, BO, offset + LW, BO + LH);

			switch (char) {
			case 'u':
				p.line(offset + LW, BO + LH / 2, offset + LW, BO + LH);
				break;

			case 'e':
				p.line(offset, BO + LH, offset + LW, BO + LH);
				break;
			}

			break;

		case 'k':
		case 'r':
		case 'm':
		case 'v':
			p.line(offset, BO + LH / 2, offset + LW, BO + LH / 2);
			if (char == 'k') break;

			if (char != 'r') {
				p.line(offset, BO + LH * (2/3), offset + LW, BO + LH * (2/3));
				if (char == 'm') break;
			}

			switch (nextShape) {
			case 'i':
				p.line(offset + LW * (3/3), BO + LH * (1/3), offset + LW * (2.7/5), BO + LH * (4/5));
				break;

			case 'o':
				p.line(offset + LW * (2.7/5) - LW * 0.55, BO + LH * (1/3), offset + LW * (3/3) - LW * 0.55, BO + LH * (4/5));
				break;
			}

			break;
		}

		if (char == 'a' || char == 'e' || char == 'i' || char == 'u' || next == ' ') offset += LO;
		if (char == ' ') offset += SO;
	}
}

window.addEventListener('load', () => new p5(sketch, 'root'));
