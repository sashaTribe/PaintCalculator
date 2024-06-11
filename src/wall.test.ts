 import { beforeEach } from 'node:test';
//import {Wall} from './wall'
import * as wall from "./wall"
//import {calcArea, convertCm2toM2} from 'Wall';
import {describe,expect,test} from '@jest/globals';

const Wall = require("./wall")
describe('Wall', () => {
    const wall = new Wall();

    test("calculates area",() => {
        expect(wall.calcArea(300,400).toBe(120000))
    })
    test("converting cm to m", () => {
        expect(wall.convertCm2toM2(120000).toBe(12))
    })
    
});



