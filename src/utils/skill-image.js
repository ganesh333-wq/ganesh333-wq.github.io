import angular from '/svg/skills/angular.svg';
import bootstrap from '/svg/skills/bootstrap.svg';
import css from '/svg/skills/css.svg';
import firebase from '/svg/skills/firebase.svg';
import git from '/svg/skills/git.svg';
import html from '/svg/skills/html.svg';
import javascript from '/svg/skills/javascript.svg';
import materialui from '/svg/skills/materialui.svg';
import mongoDB from '/svg/skills/mongoDB.svg';
import nextJS from '/svg/skills/nextJS.svg';
import react from '/svg/skills/react.svg';
import tailwind from '/svg/skills/tailwind.svg';
import typescript from '/svg/skills/typescript.svg';
import nestjs from '/svg/skills/nest.svg';
import python from '/svg/skills/python.svg';
import sql from '/svg/skills/sql.png';
import excel from '/svg/skills/excel.png';
import powerbi from '/svg/skills/powerbi.png';
import ml from '/svg/skills/ml.png';
import dl from '/svg/skills/dl.png';
import genai from '/svg/skills/genAI.png';
import dataanalytics from '/svg/skills/DA.png';

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case 'html':
      return html;
    case 'css':
      return css;
    case 'angular':
      return angular;
    case 'javascript':
      return javascript;
    case 'next js':
      return nextJS;
    case 'react':
      return react;
    case 'typescript':
      return typescript;
    case 'nest js':
      return nestjs;
    case 'bootstrap':
      return bootstrap;
    case 'mongodb':
      return mongoDB;
    case 'tailwind':
      return tailwind;
    case 'firebase':
      return firebase;
    case 'git':
      return git;
    case 'materialui':
      return materialui;
    case 'python':
      return python;
    case 'sql':
      return sql;
    case 'excel':
      return excel;
    case 'power bi':
    case 'powerbi':
      return powerbi;
    case 'machine learning':
      return ml;
    case 'deep learning':
      return dl;
    case 'generative ai':
      return genai;
    case 'data analytics':
      return dataanalytics;
    default:
      break;
  }
}
