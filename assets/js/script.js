

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 400;
let score = 0;
let vies = 5;
let vitesseDeJeux = 3;
let saut = false
let rafraichissements = 0; // servira de referentiel pour afficher des éléments; e.g.: ajouter un enemie toutes les x nombres d'images et accelerer le jeux.


const fondJeux = new Image();
fondJeux.src = 'assets/images/forest.jpg';

const FJ = {

  x1: 0,
  x2: canvas.width,
  y: 0,
  largeur: canvas.width,
  hauteur: canvas.height,
};
function defilementFJ() {
  FJ.x1 -= vitesseDeJeux;
  if(FJ.x1 < -FJ.largeur){
    FJ.x1 = FJ.largeur - 5;
  };
  FJ.x2 -= vitesseDeJeux;
  if(FJ.x2 < -FJ.largeur){
    FJ.x2 = FJ.largeur - 5;
  };
  ctx.drawImage(fondJeux, FJ.x1, FJ.y, FJ.largeur, FJ.hauteur);
  ctx.drawImage(fondJeux, FJ.x2, FJ.y, FJ.largeur, FJ.hauteur);
  // Afficher le fond 2 fois et faire défiler les images l'une derrière l'autre permet, progréssivement de ne pas avoir de vide dans l'animation du fond de jeux. Laffichage de la 1ere commence tout à gauche et fait place à la 2ème qui commence à remplir l'écran de la droite.
};


///////////////////////////// POTS DE MIELS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Le tableau ci-dessous contiendra les pots de miel (le même procéder sera appliqué aux enemies)
const imagePot = new Image();
imagePot.src = '/Users/fadiloubarry/Desktop/IFOCOP_DevJS/HoneyChase/assets/images/honeypotsimple.png';
const tabPotsDeMiel = []; 
class PotsDeMiel {
  constructor(){
    this.x = canvas.width;
    this.y = Math.random() * (300 - 160) + 160; // permet de faire apparaître les pots à des hauteurs aléatoire.
    this.rayon = 20;
    this.vitesse = vitesseDeJeux;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.largeur = 512;
    this.hauteur = 512;
    this.collision;
  };
  update(){
    this.x -= this.vitesse; // le pot va defiler vers la gauche avec le fond de jeux
    const cx = this.x - grizzly.x;
    const cy = this.y - grizzly.y;
    this.collision = Math.sqrt(cx * cx + cy * cy);

    // Il y a collision lorsque la distance entre le centre du pot de miel ou de l'enemie et celui du grizzly est inferrieur à leur rayons combinés. Pour le calculer cela on utilise le théorème de Pythagore; cx et dx représentent 2 côtés d'un triangle rectangle et la distance(this.collision) représetent l'hypothénuse.
  };
  draw(){
    ctx.drawImage(imagePot, this.largeur * this.frameX, this.hauteur * this.frameY, this.largeur, this.hauteur, this.x - 20, this.y - 25, this.largeur/12, this.hauteur/12);
  };
};

function afficherPDM(){
  if (rafraichissements % 100 == 0){ // tous les 100 rafraîchissements on crée un pot de miel
      tabPotsDeMiel.push(new PotsDeMiel());
    }
  for(let i = 0; i < tabPotsDeMiel.length; i++){ // On parcourt le tableau pour afficher les pots
      tabPotsDeMiel[i].update();
      tabPotsDeMiel[i].draw();
    }
  for(let i = 0; i < tabPotsDeMiel.length; i++){ //Quand le pot sort du cadre on le sort du tableau
      if (tabPotsDeMiel[i].x < 0){
          tabPotsDeMiel.splice(i, 1);
        };
      if( tabPotsDeMiel[i].collision < tabPotsDeMiel[i].rayon + grizzly.rayon)
      { score += 10
      tabPotsDeMiel.splice(i,1)};
    };
};


/////////////////////// ANIMAUX \\\\\\\\\\\\\\\\\\\\\\

// Ours

const spriteours = new Image();
spriteours.src = '/Users/fadiloubarry/Desktop/IFOCOP_DevJS/HoneyChase/assets/images/Bear_copie.png';

class Ours {
  constructor(){
    this.x = 50;
    this.y = 300;
    this.rayon = 40;
    this.frameX = 2;
    this.frameY = 1;
    //this.frame = 0;
    this.largeur = 128;
    this.hauteur = 128;
    this.punch = false;
  };
  update(){
    if (this.frameX < 8){
    
      this.frameX++;}
      else 
      {this.frameX = 2;}
  };
  draw(){
    ctx.drawImage(spriteours, this.largeur * this.frameX, this.hauteur * this.frameY, this.largeur, this.hauteur, this.x - 45, this.y - 70, this.largeur, this.hauteur);
  }
};
const grizzly = new Ours();

/// Loups

const spriteLoup = new Image();
spriteLoup.src = '/Users/fadiloubarry/Desktop/IFOCOP_DevJS/HoneyChase/assets/images/Loup2.png';


const loups  = {
  x: 500,
  y: 300,
  largeur: 64,
  hauteur: 64,
  frameX:0,
  frameY:1,
  avance: false,
  vitesse: 13,
  arret: true
  
};
const tabLoups = [];
class Loups {
  constructor(){
    this.x = canvas.width;
    this.y = 330;
    this.rayon = 20;
    this.frameX = 2;
    this.frameY = 1;
    this.frame = 0;
    this.largeur = 64;
    this.hauteur = 64;
    this.vitesse = vitesseDeJeux;
    this.collision;
  };
  update(){

    this.x -= this.vitesse;
    
    if (this.frameX < 9){
    
      this.frameX++;}
      else 
      {this.frameX = 0;};

    const cx = this.x - grizzly.x;
    const cy = this.y - grizzly.y;
    this.collision = Math.sqrt(cx * cx + cy * cy);
   
  };
  draw(){
    ctx.drawImage(spriteLoup, this.largeur * this.frameX, this.hauteur * this.frameY, this.largeur, this.hauteur, this.x - 35, this.y - 60, this.largeur * 1.5, this.hauteur * 1.5);
  }
};

function afficherLoups(){
  if (rafraichissements % 700 == 0){
      tabLoups.push(new Loups());
    }
  for(let i = 0; i < tabLoups.length; i++){ 
      tabLoups[i].update();
      tabLoups[i].draw();
    }
  for(let i = 0; i < tabLoups.length; i++){
      if (tabLoups[i].x < 0){
          tabLoups.splice(i, 1);
        };
      if( tabLoups[i].collision < tabLoups[i].rayon + grizzly.rayon)
      { vies--;
      tabLoups.splice(i,1)};
    };
};



// Guêpe

const spriteAbeille = new Image();
spriteAbeille.src = '/Users/fadiloubarry/Desktop/IFOCOP_DevJS/HoneyChase/assets/images/hornet-sprite.png';

const abeille  = {
  x: 300,
  y: 240,
  largeur: 59.6,
  hauteur: 60.5,
  frameX:0,
  frameY:3,
  vitesse: 9,
  avance: false,
  arret: true

};
const tabGuepes = [];
class Guepes {
  constructor(){
    this.x = canvas.width;
    this.y = 300;
    this.rayon = 20;
    this.frameX = 0;
    this.frameY = 1;
    this.frame = 0;
    this.largeur = 59.6;
    this.hauteur = 60.5;
    this.vitesse = vitesseDeJeux;
    this.collision;
  };
  update(){

    this.x -= this.vitesse;
    if (this.frameX < 6){
    
      this.frameX++;}
      else 
      {this.frameX = 0;};
 
    const cx = this.x - grizzly.x;
    const cy = this.y - grizzly.y;
    this.collision = Math.sqrt(cx * cx + cy * cy);
   
  };
  draw(){

    ctx.drawImage(spriteAbeille, this.largeur * this.frameX, this.hauteur * this.frameY, this.largeur, this.hauteur, this.x - 25, this.y - 60, this.largeur * 1.5, this.hauteur * 1.5);
  }
};

function afficherGuepes(){
  if (rafraichissements % 500 == 0){
      tabGuepes.push(new Guepes());
    }
  for(let i = 0; i < tabGuepes.length; i++){ 
      tabGuepes[i].update();
      tabGuepes[i].draw();
    }
  for(let i = 0; i < tabGuepes.length; i++){ //Quand le pot sort du cadre on le sort du tableau
      if (tabGuepes[i].x < 0){
          tabGuepes.splice(i, 1);
        };
      if( tabGuepes[i].collision < tabGuepes[i].rayon + grizzly.rayon)
      { vies--;
      tabGuepes.splice(i,1)};
    };
};

/////// Difficulté \\\\\\\\\\

function difficulté(){
  if (rafraichissements % 500 == 0){
    vitesseDeJeux++;
  };
};


////// Contrôle \\\\\\\

function jump() {
  window.onkeydown = function(event){
    let touche = event.keyCode;
  if(touche == 90){
  let up = setInterval(function () {
    if (grizzly.y < 170) {
      clearInterval(up)
      let down = setInterval(function () {
        if (grizzly.y > 300) {
         clearInterval(down);
         grizzly.frameY = 1;
        }
        else
        grizzly.y += 3;}
        ,20);
      };
  let gravity = 1.1;
  grizzly.frameY = 5;
  grizzly.y -= 30*gravity;}
  , 30)}}};

//Game Over

function FinDeJeu() {
  if (vies < 1){
  clearInterval(go);
  alert("Vous avez perdu !");}

  if(score >= 150){
    clearInterval(go);
  alert("Félicitations, vous avez les bases !");
  }
};


//Affichache info

function affichageInfo(){

  ctx.fillStyle = 'black';
  ctx.fillText('Vies: ' + vies, 10, 20);
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillStyle = 'lightblue';
  ctx.fillText('UTILISEZ LA TOUCHE "Z" POUR SAUTER OU CLIQUER SUR LE NID D\'ABEILLE POUR ACCEDER AU CV', 10, 400 );

  if(score > 50){
    ctx.fillStyle = 'orange';
    ctx.fillText('HTML acquis', 600, 10);
  };
  if(score > 100){
    ctx.fillStyle = 'blue';
    ctx.fillText('CSS acquis', 600, 20);
  };
  if(score > 150){
    ctx.fillStyle = 'yellow';
    ctx.fillText('Javascript acquis', 600, 30);
  };
};

///////////ANIMATION\\\\\\\\\\\


function anime(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  defilementFJ();
  grizzly.update();
  grizzly.draw();
  rafraichissements++;
  affichageInfo();
  difficulté();
  afficherPDM();
  afficherLoups();
  afficherGuepes();
  FinDeJeu();
  jump();
  
  
};

const go = setInterval(anime, 40);