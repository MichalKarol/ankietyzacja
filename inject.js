//Copyright 2017 mkarol <michal.p.karol@gmail.com>
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
//to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
//and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

let sildersToMap = [];
let mapping = {
    "1": "4",
    "2": "3",
    "3": "5",
    "4": "2",
    "5": "1"
};

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function switchButtons() {
    // Switching buttons order
    let saveBtn = document.getElementsByName('save')[0];
    let cancelBtn = document.getElementsByName('delete')[0];
    saveBtn.style.float='right';
    cancelBtn.style.float='left';
}
function switchToSliders() {
    let rows = document.getElementsByClassName('row');
    rows = Array.from(rows).slice(4, 20);

    // For each row
    rows.forEach((row, index) => {
        let rootSpan = row.lastElementChild;
        let name = rootSpan.firstElementChild.name;
        let checkedElement = Array.from(document.getElementsByName(name)).find(r => r.checked);
        let currentValue = checkedElement ? checkedElement.value : '5';
        while (rootSpan.firstChild) {
            rootSpan.removeChild(rootSpan.firstChild);
        }

        // Create clider
        let id =  'slider' + index;
        sildersToMap.push(id);
        let slider = document.createElement('input');
        slider.id = id;
        slider.name = name;
        slider.type = 'text';
        rootSpan.appendChild(slider);

        new Slider('#' + id, {
            step: 1,
            min: 1,
            max: 5,
            ticks: [1, 2, 3, 4, 5],
            ticks_labels: ['Nie zgadzam się', 'Częściowo nie zgadzam się', 'Nie mam zdania', 'Częściowo zgadzam się', 'Zgadzam się'],
            value: getKeyByValue(mapping, currentValue),
            tooltip: 'hide',
        });
    });
}
function mapSubmitData() {
    document.getElementById('ankieta-form').onsubmit = () => {
        sildersToMap.forEach((id) => {
            let input = document.getElementById(id);
            console.log(input.value, mapping[input.value]);    
            input.value = mapping[input.value];
        })
        return true;
    };
}

function transformPage() {
    switchButtons();
    switchToSliders();
    mapSubmitData();
}

document.addEventListener("DOMContentLoaded", transformPage);