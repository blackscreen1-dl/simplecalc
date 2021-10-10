const data = {
	calc: `
	<div id="calcres">Result will appear here</div>
	<textarea id="calctext" placeholder="Type your equation here..."></textarea>
	<p>Supported functions: +, -, *, /, sin(), cos(), tan()</p>
	<select id="rad">
		<option value="rad">Radians</option>
		<option value="deg">Degrees</option>
	</select>
	<p>Decimal Places</p>
	<select id="dec">
		<option value="0">0</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="9">9</option>
		<option value="10">10</option>
	</select>
	<button id="calc" onclick="evalc()">Calculate</button>
	`,
	sim: `
	<table id="sim">
		<tr>
			<td class="simul"><textarea id="simx1"></textarea></td>
			<td class="simul">x + </td>
			<td class="simul"><textarea  id="simx2"></textarea></td>
			<td class="simul">y = </td>
			<td class="simul"><textarea  id="simx3"></textarea></td>
		</tr>
		<tr>
			<td class="simul"><textarea id="simy1"></textarea></td>
			<td class="simul">x + </td>
			<td class="simul"><textarea  id="simy2"></textarea></td>
			<td class="simul">y = </td>
			<td class="simul"><textarea  id="simy3"></textarea></td>
		</tr>
	</table>
	<button id="calc" onclick="evals()">Calculate</button>
	<div id="simres">Result will appear here</div>
	`,
	abt: `<p style="text-align: left">This website is a calculator website made for a project. It comprises of a simple calculator, as well as a simultaneous equation solver. Enjoy!</p>`,
};

const page = (a) => {
	document.getElementsByClassName("main")[0].innerHTML = data[a];
};

function evalc() {
	var s = String(
		document
			.getElementById("calctext")
			.value.replace("cos", "Math.cos")
			.replace("sin", "Math.sin")
			.replace("tan", "Math.tan")
	);
	var l = document.getElementById("rad").selectedOptions[0].value;
	if (l === "deg") {
		s = s
			.replace("(", "((")
			.replace(")", "))")
			.replace("cos((", "cos(Math.PI/180*(")
			.replace("sin((", "sin(Math.PI/180*(")
			.replace("tan((", "tan(Math.PI/180*(");
	}
	var res = eval(s);
	if (String(res) === "undefined" || String(res) === "NaN") {
		document.getElementById("calcres").innerHTML = "Error";
	} else {
		var decim = Number(document.getElementById("dec").selectedOptions[0].value);
		document.getElementById("calcres").innerHTML = res
			.toFixed(decim)
			.toLocaleString("fullwide", { useGrouping: false });
	}
}

function evals() {
	var x1 = Number(document.getElementById("simx1").value);
	var x2 = Number(document.getElementById("simx2").value);
	var x3 = Number(document.getElementById("simx3").value);
	var y1 = Number(document.getElementById("simy1").value);
	var y2 = Number(document.getElementById("simy2").value);
	var y3 = Number(document.getElementById("simy3").value);
	if (x1 / y1 === x2 / y2) {
		if (x1 / y1 === x3 / y3) {
			document.getElementById("simres").innerHTML = "Infinite solutions";
		} else {
			document.getElementById("simres").innerHTML = "No solutions";
		}
	} else {
		var x = (x3 * y2 - y3 * x2) / (x1 * y2 - y1 * x2);
		var y = (x1 * y3 - y1 * x3) / (x1 * y2 - y1 * x2);
		if (String(x) != "NaN" && String(y) != "NaN") {
			document.getElementById("simres").innerHTML = "x = " + x + ", y = " + y;
		} else {
			document.getElementById("simres").innerHTML = "Error";
		}
	}
}
