import angular from '/public/svg/skills/angular.svg';
import bootstrap from '/public/svg/skills/bootstrap.svg';
import css from '/public/svg/skills/css.svg';
import firebase from '/public/svg/skills/firebase.svg';
import git from '/public/svg/skills/git.svg';
import html from '/public/svg/skills/html.svg';
import javascript from '/public/svg/skills/javascript.svg';
import materialui from '/public/svg/skills/materialui.svg';
import mongoDB from '/public/svg/skills/mongoDB.svg';
import nextJS from '/public/svg/skills/nextJS.svg';
import react from '/public/svg/skills/react.svg';
import tailwind from '/public/svg/skills/tailwind.svg';
import typescript from '/public/svg/skills/typescript.svg';
import nestjs from '/public/svg/skills/nest.svg';
import python from '/public/svg/skills/python.svg';
import sql from '/public/svg/skills/sql.png';
import excel from '/public/svg/skills/excel.png';
import powerbi from '/public/svg/skills/powerbi.png';
import ml from '/public/svg/skills/ml.png';
import dl from '/public/svg/skills/dl.png';
import genai from '/public/svg/skills/genAI.png';
import dataanalytics from '/public/svg/skills/DA.png';

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
