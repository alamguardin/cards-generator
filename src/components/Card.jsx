import RarityWhite from '../assets/card-rarity/Rarity_01.png'
import RarityBlue from '../assets/card-rarity/Rarity_02.png'
import RarityGreen from '../assets/card-rarity/Rarity_03.png'
import RarityRed from '../assets/card-rarity/Rarity_04.png'
import RarityPurple from '../assets/card-rarity/Rarity_05.png'
import RarityGold from '../assets/card-rarity/Rarity_06.png'

import GemRarityWhite from '../assets/rarity/Gem_Rarity_White.png'
import GemRarityBlue from '../assets/rarity/Gem_Rarity_Blue.png'
import GemRarityGreen from '../assets/rarity/Gem_Rarity_Green.png'
import GemRarityRed from '../assets/rarity/Gem_Rarity_Red.png'
import GemRarityPurple from '../assets/rarity/Gem_Rarity_Purple.png'
import GemRarityGold from '../assets/rarity/Gem_Rarity_Gold.png'

import IcAttack from '../assets/ic/ic_attack.png'
import IcHealth from '../assets/ic/ic_health.png'
import IcScore from '../assets/ic/ic_score.png'
import IcHealthStructure from '../assets/ic/ic_health_structure.png'
import IcSpell from '../assets/ic/ic_spell.png'
import IcTrap from '../assets/ic/ic_trap.png'
import IcSpellFast from '../assets/ic/ic_spell_fast.png'
import IcSpellSlow from '../assets/ic/ic_spell_slow.png'

import ThresholdWhite from '../assets/threshold/Threshold_white.png'
import ThresholdBlue from '../assets/threshold/Threshold_blue.png'
import ThresholdGreen from '../assets/threshold/Threshold_green.png'
import ThresholdRed from '../assets/threshold/Threshold_red.png'
import ThresholdPurple from '../assets/threshold/Threshold_purple.png'
import ThresholdGold from '../assets/threshold/Threshold_gold.png'

const typeCard = {
    white: RarityWhite,
    blue: RarityBlue,
    green: RarityGreen,
    red: RarityRed,
    purple: RarityPurple,
    gold: RarityGold
}

const threshold = {
    white: ThresholdWhite,
    blue: ThresholdBlue,
    green: ThresholdGreen,
    red: ThresholdRed,
    purple: ThresholdPurple,
    gold: ThresholdGold
}

const gemRarity = {
    white: GemRarityWhite,
    blue: GemRarityBlue,
    green: GemRarityGreen,
    red: GemRarityRed,
    purple: GemRarityPurple,
    gold: GemRarityGold
}

function Card({type, classCard, rarity, name, image, manna, attack, life, keywords, effect, footer, movements}) {

    function addMovements(movements) {
        let content = []
        for(let i = 0; i < movements; i++) {
            content.push(<img src={threshold[classCard]} width="32" key={i}></img>)
        }
        return content
    }

    return (
        <div className='card'>
            <img src={typeCard[classCard]} alt="" className='card-front'/>
            <img src={gemRarity[rarity]} alt="" className='card-rarity' width="28"/>
            <p className='card-name'>{name}</p>
            <p className='card-keywords'>{keywords}</p>
            <pre><p className='card-effect'>{effect}</p></pre>
            <p className={`card-footer ${(type === 'spell-slow' || type === 'spell-fast') ? 'spell' : ''}`}>
                { (type === 'spell-slow' || type === 'spell-fast') && 
                <img src={type === 'spell-slow' ? IcSpellSlow : IcSpellFast} width="20"/>
                }
                {footer}
                { (type === 'spell-slow' || type === 'spell-fast') && 
                <img src={type === 'spell-slow' ? IcSpellSlow : IcSpellFast} width="20"/>
                }
            </p>
            { (type === 'spell-slow' || type === 'spell-fast') &&
            <img src={type === 'spell-slow' ? IcSpellSlow : IcSpellFast} width="24" className='card-top-symbol'/>
            }
            <div className='card-movements'>
                {addMovements(movements)}
            </div>
            <div className='card-manna'>
                <img src={IcScore} alt="" width="62"/>
                <p>{manna}</p>
            </div>
            { type === 'unit' &&
            <div className='card-attack'>
                <img src={IcAttack} alt="" width="62"/>
                <p>{attack}</p>
            </div>
            }
            { (type === 'unit' || type === 'structure') &&
            <div className='card-life'>
                <img src={type === 'structure' ? IcHealthStructure : IcHealth} alt="" width="62"/>
                <p>{life}</p>
            </div>
            }
            <div className='card-avatar'>
                <img src={image} alt="" />
            </div>
            { (type !== 'unit' || type === 'structure') &&
            <div className='card-symbol'>
                <img src={type === 'trap' ? IcTrap : IcSpell} alt=""  width="62"/>
            </div>
            }
        </div>
    )
}

export default Card