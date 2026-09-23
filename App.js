import {View,Text,ScrollView,StyleSheet} from 'react-native';
export default function App(){
return(
<View style={s.c}>
<View style={s.h}><Text style={s.logo}>FLORENTSPORT</Text><Text style={s.sub}>FLASHCORE BESSOCCER 1XBET</Text></View>
<ScrollView style={s.p}>
<View style={s.m}><Text style={s.l}>FASOFOOT L1 LIVE 72</Text><Text style={s.t}>Douanes 2 - 1 RCB</Text><Text style={s.d}>Buts Boureima 23 55 Sylla 60</Text><Text style={s.d}>Jaune 3 Rouge 1 Corners 8 Fautes 14 Poss 58-42</Text><Text style={s.d}>Coach Malo Stade Municipal</Text></View>
<View style={s.m}><Text style={s.l}>FASOFOOT L1 LIVE 68</Text><Text style={s.t}>Salitas 1 - 1 SONABEL</Text><Text style={s.d}>Nikiema 12 Kabore 44 Jaune 2 Corners 5</Text></View>
<View style={s.m}><Text style={s.l}>PREMIER LEAGUE 16h30</Text><Text style={s.t}>Man City vs Arsenal Cote 2.05</Text><Text style={s.d}>Prono Over 2.5 Cote 1.90</Text></View>
<View style={s.m}><Text style={s.l}>LALIGA 19h00</Text><Text style={s.t}>Real Madrid vs Barca</Text><Text style={s.d}>Cote 2.20 BTTS Oui 1.70</Text></View>
<View style={s.card}><Text style={s.tt}>PRONOS JOUR</Text><Text style={s.d}>Douanes vs RCB 1X Over 1.5 Cote 1.85 85pct</Text></View>
<View style={s.card}><Text style={s.tt}>BUTEURS CLASSEMENT</Text><Text style={s.d}>Bayala 12 buts Douanes</Text><Text style={s.d}>1 Douanes 45pts 2 EFO 42pts 3 Salitas 38pts</Text></View>
<View style={s.card}><Text style={s.tt}>STATS COMPLET</Text><Text style={s.d}>8.5 corners 22 fautes 3.2 jaunes 0.3 rouge</Text><Text style={s.d}>Sawadogo GK 90pct arrets Ouedraogo 85pct tacles</Text></View>
</ScrollView>
</View>
);
}
const s=StyleSheet.create({
c:{flex:1,backgroundColor:'#f2f2f2',paddingTop:35},
h:{backgroundColor:'#ff6b00',padding:15,alignItems:'center'},
logo:{color:'white',fontWeight:'900',fontSize:18},
sub:{color:'white',fontSize:8,fontWeight:'700',marginTop:3},
p:{padding:8},
m:{backgroundColor:'white',padding:12,borderRadius:8,marginBottom:8,borderLeftWidth:3,borderLeftColor:'#ff6b00'},
l:{fontSize:9,color:'#999',fontWeight:'900'},
t:{fontSize:14,fontWeight:'700',marginTop:4},
d:{fontSize:10,color:'#555',marginTop:2},
card:{backgroundColor:'white',padding:12,borderRadius:8,marginBottom:10},
tt:{fontWeight:'900',fontSize:11,color:'#ff6b00',marginBottom:4}
});