from typing import Dict
import operator
from  .constants import BoradInfo
def check_fleet_setting_descending_order(board_fleet:Dict, param_fleet:Dict) -> bool:
    sorted_board_fleet = sorted(board_fleet.items(), key=operator.itemgetter(0), reverse=True)
    sorted_param_fleet = sorted(param_fleet.items(), key=operator.itemgetter(0), reverse=True)

    flag=True
    counter_ship_in_construction=0
    enabled_count=False
    if len(sorted_board_fleet) and len(sorted_param_fleet):
        if sorted_param_fleet[0][0] < sorted_board_fleet[0][0]:
            flag=False
    for (k, v) in sorted_param_fleet:
        if flag == False:
            break
        if enabled_count == False:
            if board_fleet.get(k, 0) > v:
                flag=False
                print('masz juz za duzo statkow najwiekszych')
                break
            elif board_fleet.get(k, 0) < v:
                enabled_count=True
                print(f'nie masz wystarczajco duzo statkwo {k}-masztowcyh, liczymy ile masz mniejszych')
        else:    
            counter_ship_in_construction += board_fleet.get(k, 0)
    if counter_ship_in_construction > 1:
        print('masz za duzo malych statkow, buduj od najwiekszych')
        flag=False
    
    return flag

def compare_fleet(board_fleet:Dict, param_fleet:Dict) -> bool:
    flag=True
    if len(board_fleet) != len(param_fleet):
        flag=False
    for (k, v) in param_fleet.items():
        if v != board_fleet.get(k, 0):
            flag=False
            break
    return flag

def get_hit_and_sunk_info(length: int) -> BoradInfo:
    if length == 1:
        return BoradInfo.HIT_AND_SUNK_1
    elif length == 2:
        return BoradInfo.HIT_AND_SUNK_2
    elif length == 3:
        return BoradInfo.HIT_AND_SUNK_3
    elif length == 4:
        return BoradInfo.HIT_AND_SUNK_4
    else:
        return BoradInfo.HIT_AND_SUNK_5