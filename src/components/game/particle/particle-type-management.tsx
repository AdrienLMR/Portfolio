import { Vector2 } from "../../multi-scripts-use/utils";

import { BehaviorSettings } from "./particle-behaviors/p_base";

import PCModifiers, { E_Modifier, PCModifiers_BounceOnNear, PCModifiers_DirectionOnNearMouse, PCModifiers_PositionOutsideMouseArea, PCModifiers_ReverseSpeedOnNearMouse, PCModifiers_SpeedOnNearMouse, PCModifiers_SpeedStopOnTopOfMouse } from "./particle-components/pc_modifiers";
import PCMouseBehaviors from "./particle-components/pc_mouse-behaviors";
import PCStyles from "./particle-components/pc_styles";

export type ParticleSettings = {
    nParticles: number;
    mouseAreaMinMax: Vector2;
    speedMinMax: Vector2;
    sprites: string[];
    size: Vector2;
}

export class ParticlesDataManager {
    public behaviorSettings: BehaviorSettings;
    public particleSettings: ParticleSettings;
    public modifiersManager: ModifiersManager;
    public mouseBehaviorsManager: MouseBehaviorsManager;
    public stylesManager: StylesManager;

    constructor(
        behaviorSettings: BehaviorSettings,
        particleSettings: ParticleSettings,
        modifiersManager: ModifiersManager,
        mouseBehaviorsManager: MouseBehaviorsManager,
        stylesManager: StylesManager) {
        this.behaviorSettings = behaviorSettings;
        this.particleSettings = particleSettings;
        this.modifiersManager = modifiersManager;
        this.mouseBehaviorsManager = mouseBehaviorsManager;
        this.stylesManager = stylesManager;
    }

    public InitManagers() {
        this.modifiersManager.Init(this.particleSettings);
        this.mouseBehaviorsManager.Init(this.particleSettings);
        this.stylesManager.Init(this.particleSettings);
    }
}

export abstract class ComponentsManager {
    public Init(particleSettings: ParticleSettings) { }
}

export class ModifiersManager extends ComponentsManager {
    public static positionOutsideMouseArea: PCModifiers_PositionOutsideMouseArea = new PCModifiers_PositionOutsideMouseArea();
    public static directionOnNearMouse: PCModifiers_DirectionOnNearMouse = new PCModifiers_DirectionOnNearMouse();
    public static speedOnNearMouse: PCModifiers_SpeedOnNearMouse = new PCModifiers_SpeedOnNearMouse();
    public static reverseSpeedOnNearMouse: PCModifiers_ReverseSpeedOnNearMouse = new PCModifiers_ReverseSpeedOnNearMouse();
    public static speedStopOnTopOfMouse: PCModifiers_SpeedStopOnTopOfMouse = new PCModifiers_SpeedStopOnTopOfMouse();
    public static bounceOnNear: PCModifiers_BounceOnNear = new PCModifiers_BounceOnNear();

    public onMove?: PCModifiers[];
    public onReturnInArea?: PCModifiers[];
    public onMouseUp?: PCModifiers[];
    public onMouseDown?: PCModifiers[];

    constructor(onMove?: E_Modifier[], onReturnInArea?: E_Modifier[], onMouseUp?: E_Modifier[], onMouseDown?: E_Modifier[]) {
        super();

        this.onMove = this.GetModifierClassListByEnum(onMove);
        this.onReturnInArea = this.GetModifierClassListByEnum(onReturnInArea);
        this.onMouseUp = this.GetModifierClassListByEnum(onMouseUp);
        this.onMouseDown = this.GetModifierClassListByEnum(onMouseDown);
    }

    private GetModifierClassListByEnum(modifiers: E_Modifier[] | undefined): PCModifiers[] {
        let list: PCModifiers[] = []

        modifiers?.forEach((value) => {
            switch (value) {
                case E_Modifier.PositionOutsideMouseArea:
                    list.push(ModifiersManager.positionOutsideMouseArea);
                    break;
                case E_Modifier.DirectionOnNearMouse:
                    list.push(ModifiersManager.directionOnNearMouse);
                    break;
                case E_Modifier.SpeedOnNearMouse:
                    list.push(ModifiersManager.speedOnNearMouse);
                    break;
                case E_Modifier.ReverseSpeedOnNearMouse:
                    list.push(ModifiersManager.reverseSpeedOnNearMouse);
                    break;
                case E_Modifier.SpeedStopOnTopOfMouse:
                    list.push(ModifiersManager.speedStopOnTopOfMouse);
                    break;
                    case E_Modifier.BounceOnNear:
                    list.push(ModifiersManager.bounceOnNear);
                    break;
            }
        });

        return list;
    }

    public override Init(particleSettings: ParticleSettings) {
        if (this.onMove) {
            this.onMove.forEach((modifier: PCModifiers) => {
                modifier.SetParticleSettings(particleSettings);
            })
        }
        if (this.onReturnInArea) {
            this.onReturnInArea.forEach((modifier: PCModifiers) => {
                modifier.SetParticleSettings(particleSettings);
            })
        }
        if (this.onMouseUp) {
            this.onMouseUp.forEach((modifier: PCModifiers) => {
                modifier.SetParticleSettings(particleSettings);
            })
        }
        if (this.onMouseDown) {
            this.onMouseDown.forEach((modifier: PCModifiers) => {
                modifier.SetParticleSettings(particleSettings);
            })
        }
    }
}

export class MouseBehaviorsManager extends ComponentsManager {
    public onMouseUp?: PCMouseBehaviors;
    public onMouseDown?: PCMouseBehaviors;

    constructor(onMouseUp?: PCMouseBehaviors, onMouseDown?: PCMouseBehaviors) {
        super();

        this.onMouseUp = onMouseUp;
        this.onMouseDown = onMouseDown;
    }

    public override Init(particleSettings: ParticleSettings) {
        this.onMouseUp?.SetParticleSettings(particleSettings);
        this.onMouseDown?.SetParticleSettings(particleSettings);
    }
}

export class StylesManager extends ComponentsManager {
    public styles?: PCStyles[];

    constructor(styles?: PCStyles[]) {
        super();

        this.styles = styles;
    }

    public override Init(particleSettings: ParticleSettings) {
        if (this.styles) {
            this.styles.forEach((style: PCStyles) => {
                style.SetParticleSettings(particleSettings);
            })
        }
    }
}