/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Artwork, ArtworkCategory, Exhibition } from "./types";

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: "surimpression",
    title: "Surimpression",
    category: ArtworkCategory.PRINTMAKING,
    medium: "Etching",
    size: "30 x 25 cm",
    year: 2014,
    description: "The works of Mathilde Fages are made up of a series of nebulous appearances, of compound hiatus, which seem to emerge from the space of representation, like blocks of manifest presence.",
    context: "It is the atmospheres that the artist dares to harpoon and concretize. It is not a question of contemporary salmigondis, sampling, remixing, re-sampling, but rather of a form of slimmed and inspired attention that perceives the frames of syncretic narratives – hopes and multiple daydreams – in the middle, and above all on the periphery of the order of things. The mastery of the medium will do the rest, by means of superpositions, offsets, deviations and some blurring – used with parsimony – seeking both movement, shadows and a latent erasure, as if to scrutinise death and its eventual ghostly persistence. The gestures – in Indian thread – produce a texture soaked in fictional mist and aesthetic scars, which the artist will grind, patiently, with attention and fingering.",
    image: "/images/surimpression_etching_1781157149855.jpg",
    quote: "The disturbing atypical nature of images comes, in fact, from their hypnagogic nature and the emerging image, that of the artist, will never be born of a transparent process, incapable of giving more than a disembodied reflection of the sublime.",
    quoteAuthor: "Marielle Chabal",
    isFeatured: true
  },
  {
    id: "auto-portrait",
    title: "Auto-portrait",
    category: ArtworkCategory.PRINTMAKING,
    medium: "Lithography stone",
    size: "37 x 27 cm",
    location: "Iceland, 2011",
    year: 2011,
    description: "Two lithographic stone prints made in Iceland, depicting dramatic Nordic landscapes: a wild coastline under swirling clouds and a pine forest silhouetted against an eerie luminous sky.",
    context: "This relationship to time and landscape, she acquired it during a stay of several months in Nordic countries. Regions that leave those who linger fascinated. Fascinated by what is seen, but even more by what is not seen. Everything is inhabited. The lithography is not suitable for chatters, people in a hurry.",
    image: "/images/auto_portrait_iceland_1781157248352.jpg",
    quote: "In the film, one could naively think that the panorama is the only thing you can really trust, that the lights and sounds can boast – as in a movie – only of adjusting the emotional intensities of the scene. Yet, Mathilde Fages means to you that it is the opposite. It reveals the invisible.",
    quoteAuthor: "Marielle Chabal",
    isFeatured: false
  },
  {
    id: "sous-les-cieux",
    title: "Sous les Cieux",
    category: ArtworkCategory.INSTALLATION,
    medium: "Wood engraving / sculptural printing device",
    size: "1m50 x 1m x 50 cm",
    year: 2018,
    description: "Sous les cieux assembles six engravings of sky divided into six large wooden dice whose notched faces function as interchangeable printing plates. Both printing device and random sculpture, the stacked cubes expose the plates of engravings, usually hidden, like the faces of an image to be built in volume.",
    context: "The images of the sky, taken from enlargements of ancient encyclopedic illustrations, are cut into the ribs of the wood and appear as a black and white organic matter whose support diffracts the planes in space. The ensemble stresses the function of an image, its permanence, by declining the classicism associated with the technique of engraving in favor of a use of the «offset», a technical error that marks the sensitivity of the printing gesture when passing from the engraved medium to the imprint.",
    image: "/images/sous_les_cieux_cubes_1781157169320.jpg",
    quote: "His works immerse the viewer in the detail of a landscape with a glare close to the sublime linking image and tangible space.",
    quoteAuthor: "Lucille Uhlrich",
    isFeatured: true
  },
  {
    id: "roche-mysterieuse",
    title: "Roche mystérieuse",
    category: ArtworkCategory.PRINTMAKING,
    medium: "Lithography",
    size: "56 x 38 cm",
    year: 2019,
    description: "A multi-pass color lithograph of a mysterious rock formation rising amid dense vegetation, saturated with vivid hues of yellow, green, pink and teal through the deliberate exploitation of offset imperfections.",
    context: "What she appreciates in lithographic techniques is the impossible calage; play the imperfections of the technique that wants to match each pass a color and a place of the image. A slight offset of the sheet and then there is a blurring, a subtle appearance of offsets that bring to the image a dreamlike character. Of this abhorred error of the lithographers, she makes a work because she chooses her images, her real. From there, she deflects the image fixed in the register of the animated image.",
    image: "/images/roche_mysterieuse_litho_1781157228500.jpg",
    quote: "A set of sensitive captured in the clouds, the forms of trees, the blacks of shadows.",
    quoteAuthor: "Christian Garcelon",
    isFeatured: true
  },
  {
    id: "twist-the-eyes",
    title: "Twist the Eyes",
    category: ArtworkCategory.INSTALLATION,
    medium: "Exhibition View",
    location: "Musée d'Ussel",
    year: 2019,
    description: "Exhibition view from the Musée d'Ussel solo show combining the sculptural woodblock printing cubes with large-format black and white cloud prints unfurled floor-to-ceiling as immersive backdrops.",
    context: "The pattern and divides. The image is divided in its installation of cubes engraved with gouge. The work of cutting, the work of light. The engraving in wood makes the pattern emerge. Intensified by the light that reveals the hollows and jointing lines of the associated cubes. We referring to the techniques of reproduction of drawing tiles. Here, it is drawings enlarged from encyclopaedic illustrations of skies.",
    image: "/images/twist_the_eyes_exhibition.jpeg",
    quote: "By deploying vast drawings of moving skies, she invites movement, the shift of the gaze and experience.",
    quoteAuthor: "Christian Garcelon",
    isFeatured: false
  },
  {
    id: "maniere-noire",
    title: "Manière noire 4",
    category: ArtworkCategory.PRINTMAKING,
    medium: "Lithography",
    location: "Musée d'Ussel",
    size: "56 x 38 cm",
    year: 2019,
    description: "A storm lithograph from a series realised at the Musée d'Ussel workshop using the black way technique — inking the entire substrate then drawing with tools that remove ink to produce luminous whites and rich grey camaïeux.",
    context: "This technique called the black way was conceived in the 17th century by Lieutenant-Colonel Ludwig von Siegen. It consists of inking the substrate and then drawing with various tools that remove ink. Depending on the process, a very white drawing or some kind of grey camaïeux is obtained. From this practice, which intimately links the material and the artist's gesture, Mathilde constituted a series of images of storms, which during her stay punctuated her days and her nights.",
    image: "/images/maniere_noire_storm_1781157186874.jpg",
    quote: "From this practice, which intimately links the material and the artist's gesture, Mathilde constituted a series of images of storms, which during her stay punctuated her days and her nights.",
    quoteAuthor: "Christian Garcelon",
    isFeatured: false
  },
  {
    id: "paysages-fragmentes",
    title: "Paysages fragmentés",
    category: ArtworkCategory.PRINTMAKING,
    medium: "Lithography",
    size: "56 x 38 cm",
    year: 2019,
    description: "A series of four framed lithographs depicting fragmented forest and sky landscapes from Haute-Corrèze, exploring the shift between past and present views of depopulated, overgrown territories.",
    context: "From the Haute-Corrèze, it retains its forests and skies. In short, where the shadows express themselves; shadows of clouds, shadows of trees. It also retains the lights; lights of lights, light that crosses trees and forests. Everything in a few moments plunges the countries in a soothing or brutal light, and in the darkest blacks. Geographers speak of the Massif Central of a series of countries cut off. Mathilde prefers that of fragmented countries. She tries to reattach what was and what is. Not to confine a nostalgia, but to understanding.",
    image: "/images/paysages_fragmentes.jpeg",
    quote: "Geographers speak of the Massif Central of a series of countries cut off. Mathilde prefers that of fragmented countries. She tries to reattach what was and what is.",
    quoteAuthor: "Christian Garcelon",
    isFeatured: false
  },
  {
    id: "wall-drawing-2",
    title: "Wall Drawing #2",
    category: ArtworkCategory.DRAWING,
    medium: "In-situ mural drawing",
    location: "Kyiv, Ukraine",
    year: 2019,
    description: "An in-situ mural drawing part of a series realized in Kyiv in 2019, depicting a sweeping moving landscape drawn directly onto the raw walls of buildings used for money laundering — architectural spaces that are neither under demolition nor construction.",
    context: "These buildings become borders in the city on which Mathilde leaves a moving landscape. The mural integrates directly with the texture, staining and existing marks of the building surface, its energy emanating from the tension between the frozen gesture of the drawing and the transitional nature of its support.",
    image: "/images/wall_drawing_kyiv.jpeg",
    quote: "These buildings are used for money laundering and become borders in the city on which I leave a moving landscape.",
    quoteAuthor: "Mathilde Fages",
    isFeatured: false
  },
  {
    id: "tchernobyl-memories",
    title: "Tchernobyl Memories",
    category: ArtworkCategory.DRAWING,
    medium: "Drawing with acetone",
    location: "Paralédolie, Marseille",
    year: 2023,
    description: "A series of works created with acetone transfer technique, evoking the ghostly architectural remnants and overgrown vegetation of the Chernobyl exclusion zone — broken window frames, collapsed structures, and persistent woodland growth layered in spectral colour.",
    context: "First exhibited at Paralédolie in Marseille in 2023, the Tchernobyl Memories series channels the artist's enduring investigation into sites of transition, erasure and persistence. The acetone process produces a deliberately fragile, transparent image that mirrors the subject's own precarious state between presence and disappearance.",
    image: "/images/tchernobyl_memories_drawing_1781157209322.jpg",
    quote: "A spectral series of images connected to memory, ruin, vegetation, and fragile architectural traces.",
    quoteAuthor: "Mathilde Fages",
    isFeatured: true
  },
  {
    id: "culbuto",
    title: "Culbuto",
    category: ArtworkCategory.INSTALLATION,
    medium: "Collective installation",
    location: "Ad Hoc, La Station, Nice",
    year: 2015,
    description: "A large Washingtonia palm tree — 8 metres high — uprooted and mounted on a curved weighted base, swaying freely with the wind on a concrete platform in the manner of a roly-poly toy. Second version of the founding work of the Culbuto Collective.",
    context: "The Culbuto Collective was born in March 2013 following the invitation of its members: Aurélien Cornut-Gentille, Mathilde Fages, Paul Le Bras, Vivien Roubaud, Guillaume Gouerou and Ugo Schiavi for a one month residence at Villa Garikula, Georgia. The first project gave its name to the collective: a culbuto tree realised with the support of Michel Fedorof and the art center of the Villa Arson. The Culbuto becomes synonymous with oscillation and research.",
    image: "/images/culbuto_palm_sculpture_1781157345211.jpg",
    quote: "On a concrete platform, the tree is pushed and moved by the wind. The Culbuto becomes synonymous with oscillation and research.",
    quoteAuthor: "Le Collectif Culbuto",
    isFeatured: false
  },
  {
    id: "ex-situ-in-vito",
    title: "Ex situ in vito",
    category: ArtworkCategory.INSTALLATION,
    medium: "Sodium lamps, watering system, vegetation",
    size: "7 m x 3 m",
    location: "MAMAC, Nice",
    year: 2014,
    description: "For the MAMAC exhibition, the Culbuto Collective takes a sample of landscape from the high country of Nice, almost seven meters long — a cross-section of local vegetation and a car carcass — and preserves it alive inside a modular system of boxes equipped with sodium lamps and a watering device.",
    context: "This cross section, frank and radical, is presented in a system of boxes that serves both as a transport device and totally modular and autonomous conservation reconstructing the natural landscape in plan-sequence. Self-powered by water and electricity, the installation takes on the appearance of a vestige that would be kept alive, preserved, analyzed and exposed. Their approach is oriented towards the collection and study of phenomena in which time becomes the expression of a potential reality.",
    image: "/images/ex_situ_in_vito_1781157272490.jpg",
    quote: "Self-powered by water and electricity, the installation takes on the appearance of a vestige that would be kept alive, preserved, analyzed and exposed.",
    quoteAuthor: "Rebecca François",
    isFeatured: false
  }
];

export const INITIAL_EXHIBITIONS: Exhibition[] = [
  {
    year: 2023,
    title: "Paralédolie, Marseille",
    subtitle: "Tchernobyl Memories",
    location: "Marseille, France",
    category: "Exhibition",
    description: "Exhibition presenting the Tchernobyl Memories series, drawings made with acetone."
  },
  {
    year: 2019,
    title: "IZOLYATSIA Residency Programme",
    subtitle: "In-situ mural drawing and installations",
    location: "Kyiv, Ukraine",
    category: "Residency",
    description: "Working residency resulting in Wall Drawing #2, a series of mural landscapes on transitional architectural structures in the city."
  },
  {
    year: 2019,
    title: "Musée d'Ussel",
    subtitle: "Twist the Eyes",
    location: "Ussel, France",
    category: "Exhibition",
    description: "Solo exhibition combining the Sous les Cieux woodblock printing cubes, the Manière noire storm lithography series, and the Paysages fragmentés series."
  },
  {
    year: 2018,
    title: "Clark House",
    subtitle: "Contemporary workshop",
    location: "India",
    category: "Residency",
    description: "Exploration of printmaking and local craft techniques."
  },
  {
    year: 2016,
    title: "AFPA Marseille",
    subtitle: "Wood working training",
    location: "Marseille, France",
    category: "Education",
    description: "Focused training on carpentry and structural woodworking."
  },
  {
    year: 2015,
    title: "Fugitif",
    subtitle: "Atmospheric workspace residency",
    location: "Germany",
    category: "Residency",
    description: "Researching sky and cloud light formations in transit."
  },
  {
    year: 2015,
    title: "La Station, Nice",
    subtitle: "Culbuto Collective — Ad Hoc",
    location: "Nice, France",
    category: "Exhibition",
    description: "Collaborative installation exploring movement and oscillation: an 8-metre Washingtonia palm mounted on a weighted culbuto base, swaying freely in the wind."
  },
  {
    year: 2014,
    title: "MAMAC",
    subtitle: "Ex situ in vito — Culbuto Collective",
    location: "Nice, France",
    category: "Exhibition",
    description: "A living cross-section of landscape from the high country of Nice, preserved alive in an autonomous self-powered system of boxes with sodium lamps and a watering device."
  },
  {
    year: 2013,
    title: "Villa Garikula, Georgia",
    subtitle: "Culbuto Collective — founding residency",
    location: "Georgia",
    category: "Residency",
    description: "One-month founding residency of the Culbuto Collective. First project: a tree extracted from its natural environment and mounted on an independent base in the image of a roly-poly toy."
  },
  {
    year: 2011,
    title: "SIM House",
    subtitle: "Lithographic studies — Iceland",
    location: "Iceland",
    category: "Residency",
    description: "Studies on remote Nordic terrain, sky and shadow. The Auto-portrait lithography stone series was created during this residency."
  },
  {
    year: 2011,
    title: "FMC",
    subtitle: "Printmaking and zinc corrosion",
    location: "Belgium",
    category: "Residency",
    description: "Researching copper and steel paper offsets."
  },
  {
    year: 2010,
    title: "Villa Arson",
    subtitle: "Graduated from École Nationale Supérieure d'Art",
    location: "Nice, France",
    category: "Education",
    description: "National honors in graphic printing and installation techniques."
  }
];

export const BIOGRAPHY_TEXTS = {
  bio1: "Mathilde Fages (b. 1985) is an itinerant French visual artist whose practice exists in the active resonance of landscape and its representation. Graduating with honors from Villa Arson in Nice (2010), her work moves seamlessly between wood engraving, lithography, drawing, in-situ wall drawing, and kinetic collective sculpture.",
  bio2: "She works between the rural landscapes of Haute-Corrèze and coastal cities such as Marseille and Nice, capturing the transition of places, the spectral memories of abandoned zones, and the limits of environmental preservation through a focus on material gestures, offset imperfections, and sensory depth."
};
