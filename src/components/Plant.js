import React from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "./Constants";
import { useDrag } from "react-dnd";

import enemies from "../data/enemies";
import friends from "../data/friends";

import { ReactComponent as Apple } from "./plants/Apple.svg";
import { ReactComponent as Artichoke } from "./plants/Artichoke.svg";
import { ReactComponent as Asparagus } from "./plants/Asparagus.svg";
import { ReactComponent as Basil } from "./plants/Basil.svg";
import { ReactComponent as Beans } from "./plants/Beans.svg";
import { ReactComponent as Beets } from "./plants/Beets.svg";
import { ReactComponent as BroadBeans } from "./plants/BroadBeans.svg";
import { ReactComponent as Broccoli } from "./plants/Broccoli.svg";
import { ReactComponent as BrusselSprouts } from "./plants/BrusselSprouts.svg";
import { ReactComponent as Cabbage } from "./plants/Cabbage.svg";
import { ReactComponent as Carrots } from "./plants/Carrots.svg";
import { ReactComponent as Cauliflower } from "./plants/Cauliflower.svg";
import { ReactComponent as Celery } from "./plants/Celery.svg";
import { ReactComponent as Chamomile } from "./plants/Chamomile.svg";
import { ReactComponent as Cherry } from "./plants/Cherry.svg";
import { ReactComponent as Chervil } from "./plants/Chervil.svg";
import { ReactComponent as Chives } from "./plants/Chives.svg";
import { ReactComponent as ClimbingBeans } from "./plants/ClimbingBeans.svg";
import { ReactComponent as Coriander } from "./plants/Coriander.svg";
import { ReactComponent as Corn } from "./plants/Corn.svg";
import { ReactComponent as Cucumber } from "./plants/Cucumber.svg";
import { ReactComponent as Dill } from "./plants/Dill.svg";
import { ReactComponent as Eggplant } from "./plants/Eggplant.svg";
import { ReactComponent as Fennel } from "./plants/Fennel.svg";
import { ReactComponent as Garlic } from "./plants/Garlic.svg";
import { ReactComponent as GrapeVine } from "./plants/GrapeVine.svg";
import { ReactComponent as Grass } from "./plants/Grass.svg";
import { ReactComponent as Horseradish } from "./plants/Horseradish.svg";
import { ReactComponent as Lavender } from "./plants/Lavender.svg";
import { ReactComponent as Leeks } from "./plants/Leeks.svg";
import { ReactComponent as Lettuce } from "./plants/Lettuce.svg";
import { ReactComponent as Mints } from "./plants/Mints.svg";
import { ReactComponent as Mulberry } from "./plants/Mulberry.svg";
import { ReactComponent as Mustard } from "./plants/Mustard.svg";
import { ReactComponent as Nasturtium } from "./plants/Nasturtium.svg";
import { ReactComponent as Onions } from "./plants/Onions.svg";
import { ReactComponent as Orange } from "./plants/Orange.svg";
import { ReactComponent as Parsely } from "./plants/Parsely.svg";
import { ReactComponent as Parsnip } from "./plants/Parsnip.svg";
import { ReactComponent as Peas } from "./plants/Peas.svg";
import { ReactComponent as Potato } from "./plants/Potato.svg";
import { ReactComponent as Pumpkin } from "./plants/Pumpkin.svg";
import { ReactComponent as Radish } from "./plants/Radish.svg";
import { ReactComponent as Raspberry } from "./plants/Raspberry.svg";
import { ReactComponent as Rosemary } from "./plants/Rosemary.svg";
import { ReactComponent as Roses } from "./plants/Roses.svg";
import { ReactComponent as Sage } from "./plants/Sage.svg";
import { ReactComponent as Savory } from "./plants/Savory.svg";
import { ReactComponent as Shallots } from "./plants/Shallots.svg";
import { ReactComponent as Spinach } from "./plants/Spinach.svg";
import { ReactComponent as Squash } from "./plants/Squash.svg";
import { ReactComponent as Strawberries } from "./plants/Strawberries.svg";
import { ReactComponent as Sunflower } from "./plants/Sunflower.svg";
import { ReactComponent as Thyme } from "./plants/Thyme.svg";
import { ReactComponent as Tomato } from "./plants/Tomato.svg";

const FallbackIcon = props => (
  <span role="img" aria-label="placeholder plant image" {...props}>
    🌱
  </span>
);

const nameSvgMap = {
  apple: Apple,
  artichoke: Artichoke,
  asparagus: Asparagus,
  basil: Basil,
  beans: Beans,
  beets: Beets,
  "broad beans": BroadBeans,
  broccoli: Broccoli,
  "brussel sprouts": BrusselSprouts,
  cabbage: Cabbage,
  carrots: Carrots,
  cauliflower: Cauliflower,
  celery: Celery,
  chamomile: Chamomile,
  cherry: Cherry,
  chervil: Chervil,
  chives: Chives,
  "climbing beans": ClimbingBeans,
  coriander: Coriander,
  corn: Corn,
  cucumber: Cucumber,
  dill: Dill,
  eggplant: Eggplant,
  fennel: Fennel,
  garlic: Garlic,
  "grape vine": GrapeVine,
  grass: Grass,
  horseradish: Horseradish,
  lavender: Lavender,
  leeks: Leeks,
  lettuce: Lettuce,
  mints: Mints,
  mulberry: Mulberry,
  mustard: Mustard,
  nasturtium: Nasturtium,
  onions: Onions,
  orange: Orange,
  parsely: Parsely,
  parsnip: Parsnip,
  peas: Peas,
  potato: Potato,
  pumpkin: Pumpkin,
  radish: Radish,
  raspberry: Raspberry,
  rosemary: Rosemary,
  roses: Roses,
  sage: Sage,
  savory: Savory,
  shallots: Shallots,
  spinach: Spinach,
  squash: Squash,
  strawberries: Strawberries,
  sunflower: Sunflower,
  thyme: Thyme,
  tomato: Tomato,
};

const Plant = ({ id, name, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.PLANT,
      id: id, // for drop update
      name: name, // for drop add
      enemies: enemies[name] || [], // for canDrop && discouragePlacement
      friends: friends[name] || [], // for encouragePlacement
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const SvgIcon = nameSvgMap[name] || FallbackIcon;

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 46, // for fallback
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      <SvgIcon style={{ height: 46, width: 46 }} onClick={onClick}/>
    </div>
  );
};

Plant.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string, // used to create/update on drop
};

export default Plant;
