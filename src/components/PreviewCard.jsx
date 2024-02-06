// import styles}
import '../styles/PreviewCard.css'
// import assets
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

function PreviewCard({type, classCard, rarity, name, image, manna, attack, life, keywords, effect, footer, movements}) {

    function addMovements(movements) {
        let content = []
        for(let i = 0; i < movements; i++) {
            content.push(<img src={threshold[classCard]} width="32"></img>)
        }
        return content
    }

    return (
        <div className='preview'>
            <img src={typeCard[classCard]} alt="" className='preview-front'/>
            <img src={gemRarity[rarity]} alt="" className='preview-rarity' width="28"/>
            <p className='preview-name'>{name}</p>
            <p className='preview-keywords'>{keywords}</p>
            <pre><p className='preview-effect'>{effect}</p></pre>
            <p className='preview-footer'>{footer}</p>
            <div className='preview-movements'>
                {addMovements(movements)}
            </div>
            <div className='preview-manna'>
                <img src={IcScore} alt="" width="62"/>
                <p>{manna}</p>
            </div>
            { type === 'unit' &&
            <div className='preview-attack'>
                <img src={IcAttack} alt="" width="62"/>
                <p>{attack}</p>
            </div>
            }
            { type !== 'spell' &&
            <div className='preview-life'>
                <img src={type === 'structure' ? IcHealthStructure : IcHealth} alt="" width="62"/>
                <p>{life}</p>
            </div>
            }
            <div className='preview-avatar'>
                <img src={image} alt="" />
            </div>
        </div>
    )
}

export default PreviewCard