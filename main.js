﻿(function() {
    "use strict";
    // 1900-2050年农历信息表
    var lunarInfo = [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
        0x14b63 //2050
    ];
    // 天干
    var gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    // 地支
    var zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    // 十二生肖
    var animal = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    //二十四节气
    var solarTerms = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
    var nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var nStr2 = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    //1900-2050二十四节气信息表
    var arrSolar = [
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1900
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1901
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x87, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1902
        0x96, 0xA5, 0x87, 0x96, 0x87, 0x87, 0x79, 0x69, 0x69, 0x69, 0x78, 0x78, //1903
        0x86, 0xA5, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x78, 0x87, //1904
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1905
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1906
        0x96, 0xA5, 0x87, 0x96, 0x87, 0x87, 0x79, 0x69, 0x69, 0x69, 0x78, 0x78, //1907
        0x86, 0xA5, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1908
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1909
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1910
        0x96, 0xA5, 0x87, 0x96, 0x87, 0x87, 0x79, 0x69, 0x69, 0x69, 0x78, 0x78, //1911
        0x86, 0xA5, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1912
        0x95, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1913
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1914
        0x96, 0xA5, 0x97, 0x96, 0x97, 0x87, 0x79, 0x79, 0x69, 0x69, 0x78, 0x78, //1915
        0x96, 0xA5, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1916
        0x95, 0xB4, 0x96, 0xA6, 0x96, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x87, //1917
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x77, //1918
        0x96, 0xA5, 0x97, 0x96, 0x97, 0x87, 0x79, 0x79, 0x69, 0x69, 0x78, 0x78, //1919
        0x96, 0xA5, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1920
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x87, //1921
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x77, //1922
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x87, 0x79, 0x79, 0x69, 0x69, 0x78, 0x78, //1923
        0x96, 0xA5, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1924
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x87, //1925
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1926
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x87, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1927
        0x96, 0xA5, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1928
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1929
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1930
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x87, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1931
        0x96, 0xA5, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1932
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1933
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1934
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1935
        0x96, 0xA5, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1936
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1937
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1938
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1939
        0x96, 0xA5, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1940
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1941
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1942
        0x96, 0xA4, 0x96, 0x96, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1943
        0x96, 0xA5, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1944
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1945
        0x95, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x77, //1946
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1947
        0x96, 0xA5, 0xA6, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //1948
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x79, 0x78, 0x79, 0x77, 0x87, //1949
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x77, //1950
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x79, 0x79, 0x79, 0x69, 0x78, 0x78, //1951
        0x96, 0xA5, 0xA6, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //1952
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1953
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x78, 0x79, 0x78, 0x68, 0x78, 0x87, //1954
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1955
        0x96, 0xA5, 0xA5, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //1956
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1957
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1958
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1959
        0x96, 0xA4, 0xA5, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1960
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1961
        0x96, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1962
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1963
        0x96, 0xA4, 0xA5, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1964
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1965
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1966
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1967
        0x96, 0xA4, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1968
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1969
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1970
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x79, 0x69, 0x78, 0x77, //1971
        0x96, 0xA4, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1972
        0xA5, 0xB5, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1973
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1974
        0x96, 0xB4, 0x96, 0xA6, 0x97, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x77, //1975
        0x96, 0xA4, 0xA5, 0xB5, 0xA6, 0xA6, 0x88, 0x89, 0x88, 0x78, 0x87, 0x87, //1976
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //1977
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x78, 0x87, //1978
        0x96, 0xB4, 0x96, 0xA6, 0x96, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x77, //1979
        0x96, 0xA4, 0xA5, 0xB5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1980
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x77, 0x87, //1981
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1982
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x78, 0x79, 0x78, 0x69, 0x78, 0x77, //1983
        0x96, 0xB4, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x87, //1984
        0xA5, 0xB4, 0xA6, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //1985
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1986
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x79, 0x78, 0x69, 0x78, 0x87, //1987
        0x96, 0xB4, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //1988
        0xA5, 0xB4, 0xA5, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1989
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //1990
        0x95, 0xB4, 0x96, 0xA5, 0x86, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1991
        0x96, 0xB4, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //1992
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1993
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1994
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x76, 0x78, 0x69, 0x78, 0x87, //1995
        0x96, 0xB4, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //1996
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //1997
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //1998
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //1999
        0x96, 0xB4, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //2000
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2001
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //2002
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //2003
        0x96, 0xB4, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //2004
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2005
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2006
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x69, 0x78, 0x87, //2007
        0x96, 0xB4, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x87, 0x78, 0x87, 0x86, //2008
        0xA5, 0xB3, 0xA5, 0xB5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2009
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2010
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x78, 0x87, //2011
        0x96, 0xB4, 0xA5, 0xB5, 0xA5, 0xA6, 0x87, 0x88, 0x87, 0x78, 0x87, 0x86, //2012
        0xA5, 0xB3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x87, //2013
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2014
        0x95, 0xB4, 0x96, 0xA5, 0x96, 0x97, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //2015
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x87, 0x88, 0x87, 0x78, 0x87, 0x86, //2016
        0xA5, 0xC3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x87, //2017
        0xA5, 0xB4, 0xA6, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2018
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //2019
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x78, 0x87, 0x86, //2020
        0xA5, 0xC3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //2021
        0xA5, 0xB4, 0xA5, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2022
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x79, 0x77, 0x87, //2023
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x78, 0x87, 0x96, //2024
        0xA5, 0xC3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //2025
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2026
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //2027
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x78, 0x87, 0x96, //2028
        0xA5, 0xC3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //2029
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2030
        0xA5, 0xB4, 0x96, 0xA5, 0x96, 0x96, 0x88, 0x78, 0x78, 0x78, 0x87, 0x87, //2031
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x78, 0x87, 0x96, //2032
        0xA5, 0xC3, 0xA5, 0xB5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x86, //2033
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x78, 0x88, 0x78, 0x87, 0x87, //2034
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2035
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x78, 0x87, 0x96, //2036
        0xA5, 0xC3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x86, //2037
        0xA5, 0xB3, 0xA5, 0xA5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2038
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2039
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x78, 0x87, 0x96, //2040
        0xA5, 0xC3, 0xA5, 0xB5, 0xA5, 0xA6, 0x87, 0x88, 0x87, 0x78, 0x87, 0x86, //2041
        0xA5, 0xB3, 0xA5, 0xB5, 0xA6, 0xA6, 0x88, 0x88, 0x88, 0x78, 0x87, 0x87, //2042
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2043
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x88, 0x87, 0x96, //2044
        0xA5, 0xC3, 0xA5, 0xB4, 0xA5, 0xA6, 0x87, 0x88, 0x87, 0x78, 0x87, 0x86, //2045
        0xA5, 0xB3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x88, 0x78, 0x87, 0x87, //2046
        0xA5, 0xB4, 0x96, 0xA5, 0xA6, 0x96, 0x88, 0x88, 0x78, 0x78, 0x87, 0x87, //2047
        0x95, 0xB4, 0xA5, 0xB4, 0xA5, 0xA5, 0x97, 0x87, 0x87, 0x88, 0x86, 0x96, //2048
        0xA4, 0xC3, 0xA5, 0xA5, 0xA5, 0xA6, 0x97, 0x87, 0x87, 0x78, 0x87, 0x86, //2049
        0xA5, 0xC3, 0xA5, 0xB5, 0xA6, 0xA6, 0x87, 0x88, 0x78, 0x78, 0x87, 0x87 //2050
    ];
    //公历固定日期节假日
    var intlFestival = {
        "1-1": "元旦",
        "2-14": "情人节",
        "3-8": "妇女节",
        "3-12": "植树节",
        "3-15": "消费者权益日",
        "4-1": "愚人节",
        "4-22": "地球日",
        "5-1": "劳动节",
        "5-4": "青年节",
        "6-1": "儿童节",
        "6-5": "世界环境日",
        "7-1": "建党节",
        "8-1": "建军节",
        "9-3": "抗战胜利日",
        "9-10": "教师节",
        "10-1": "国庆节",
        "10-31": "万圣节",
        "12-1": "艾滋病日",
        "12-24": "平安夜",
        "12-25": "圣诞节"
    };
    //农历节日
    var lunarFestival = {
            "1-1": "春节",
            "1-15": "元宵节",
            "5-5": "端午节",
            "7-7": "七夕",
            "7-15": "中元节",
            "8-15": "中秋节",
            "9-9": "重阳节",
            "12-8": "腊八节",
            "12-23": "小年",
            "12-30": "除夕"
    };
        //按星期计算的节日
    var specFestival = {
        "5-2-7": "母亲节",
        "6-3-7": "父亲节",
        "11-4-4": "感恩节"
    };
    //判断是否是闰年
    function isLeap(y) {
        return y % 4 == 0 && y % 100 || y % 400 == 0 ? 1 : 0;
    }
    // 计算该年某月天数
    function monthDay(y, m) {
        switch (m) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return 28 + isLeap(y);
        }
    }
    //给obj添加名为name的class
    function addClass(obj, name) {
        if (obj.className.search(name) == -1) {
            if (obj.className){
                obj.className += " " + name;
            }
            else{
                obj.className = name;
            }
        }
    }
    //去掉obj名为name的class
    function removeClass(obj, name) {
        if (obj.className) {
            var reg = new RegExp("(((\\s|^)" + name + "$)|(^" + name + "(\\s|$)))");
            obj.className = obj.className.replace(reg, "");
        }
    }
    // 补充小于10的月和天前面的0
    function toDouble(i) {
        return i < 10 ? "0" + i : i;
    }
    // 更新日期的详细信息
    function updateDateInfo(c) {
        var date = document.getElementById("date");
        var day = document.getElementById("day");
        var lunar = document.getElementById("lunar");
        var lunarYear = document.getElementById('lunarYear');
        var lunarDate = document.getElementById("lunarDate");
        var feast = document.getElementById("feast");
        date.innerHTML = c.dateInfo.year + "-" + toDouble(c.dateInfo.month) + "-" + toDouble(c.dateInfo.day) + " 星期" + c.dateInfo.week;
        day.innerHTML = c.dateInfo.day;
        lunar.innerHTML = c.dateInfo.lMonth + c.dateInfo.lDay;
        lunarYear.innerHTML = c.dateInfo.gzYear +"年"+ " 【" + c.dateInfo.animal + "年】";
        lunarDate.innerHTML = c.dateInfo.gzMonth + "月 " + c.dateInfo.gzDay + "日";
        var s = "";
        if (c.dateInfo.lFest) {
            s = c.dateInfo.lFest;
        }
        if (c.dateInfo.sTerm) {
            if (s) {
                s += " " + c.dateInfo.sTerm;
            } else {
                s = c.dateInfo.sTerm;
            }
        }
        if (c.dateInfo.iFest) {
            if (s) {
                s += " " + c.dateInfo.iFest;
            } else {
                s = c.dateInfo.iFest;
            }
        }
        feast.innerHTML = s;
    }
    //改变选中的日期样式
    function changeSelected(thisDate) {
        var flag = 1;
        var i=1;
        var j=0;
        var calTab = document.getElementById("calendarTable");
        var c=null;
        for(i = 1; i < 7; i+=1) {
            for(j = 0; j < 7; j+=1) {
                c = calTab.children[0].children[i].children[j].children[0];
                removeClass(c, "selected");
                if (c.dateInfo.year + "-" + c.dateInfo.month + "-" + c.dateInfo.day == thisDate) {
                    addClass(c, "selected");
                    updateDateInfo(c);
                    flag = 0;
                }
            }
        }
        if (flag) { //若该月月有thisDate的date这天则选中该月1日
            i = thisDate.lastIndexOf("-");
            changeSelected(thisDate.substring(0, i + 1) + 1);
        }
    }
    //点击table中的操作
    function tdClick(date) {
        var y = date.year;
        var m = date.month;
        var year = document.getElementById("year");
        var month = document.getElementById("month");
        if (y != 2051 && (year.selectedIndex + 1901 != y || month.selectedIndex + 1 != m)) {
            // 若点击的不是本月则切换到点击的那个月
            year.children[y - 1901].selected = true;
            month.children[m - 1].selected = true;
            updateDate();
        }
        changeSelected(y + "-" + m + "-" + date.day);
    }
    //为表格中日期添加鼠标点击移入移出的响应
    function tdMouseFuc(e) {
        e = e || window.event;
        var target = e.target||e.srcElement;
        if (target) {
            var obj = null;
            if (target.nodeName.toLowerCase() == "div") {
                obj = target;
            } else if (target.nodeName.toLowerCase() == "span") {
                obj = target.parentNode;
            } else if (target.nodeName.toLowerCase() == "td") {
                obj = target.children[0];
            }
            if (obj) {
                switch (e.type) {
                    case "click":
                        tdClick(obj.dateInfo);
                        break;
                    case "mouseover":
                        addClass(obj, "active");
                        break;
                    case "mouseout":
                        removeClass(obj, "active");
                        break;
                }
            }
        }
    }
    //y年农历闰哪月
    function leapMonth(y) {
        return (lunarInfo[y - 1900] & 0xf);
    }
    //y年农历闰月天数
    function leapDays(y) {
        if (leapMonth(y)) {
            return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
        }
        return 0;
    }
    //y年的农历m月天数
    function lunarMonthDays(y, m) {
        var i = 0x10000 >> m;
        return lunarInfo[y - 1900] & i ? 30 : 29;
    }
    //y年农历天数
    function lunarYearDays(y) {
        var sum = 0;
        var m = lunarInfo[y - 1900];
        var i;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += m & i ? 30 : 29;
        }
        return (sum + leapDays(y));
    }
    //将农历的天转换成通俗叫法
    function lunarDay(d) {
        if (d >= 1 && d <= 10) {
            return "初" + nStr1[d];
        } else if (d <= 19) {
            return "十" + nStr1[d - 10];
        } else if (d == 20) {
            return "二十";
        } else if (d <= 29) {
            return "廿" + nStr1[d - 20];
        } else {
            return "三十";
        }
    }
    //获取y年第n个节气(以小寒为第一个节气)
    function getSolarTerm(y, n) {
        var i = parseInt((y - 1900) * 12 + n / 2);
        if (n % 2===1) {
            return 15 - (arrSolar[i] >> 4);
        } else {
            return 15 + arrSolar[i] % 16;
        }
    }
    //转换成天干地支叫法
    function ganZhi(g, z) {
        return gan[g % 10] + zhi[z % 12];
    }
    //判断某天是否为公历节假日 m为月 d为天 s为该月第几个星期w w为星期几
    function isFestival(m, d, s, w) {
        var fest = "";
        var i;
        for (i in intlFestival) {
            if (i == m + "-" + d) {
                if (fest) {
                    fest += " " + intlFestival[i];
                } else {
                    fest = intlFestival[i];
                }
            }
        }
        for (i in specFestival) {
            if (i == m + "-" + s + "-" + w) {
                if (fest) {
                    fest += " " + specFestival[i];
                } else {
                    fest = specFestival[i];
                }
            }
        }
        return fest;
    }
    //农历m月d号是否为节日
    function isLunarFestival(m, d) {
        var i;
        for (i in lunarFestival) {
            if (i == m + "-" + d) {
                return lunarFestival[i];
            }
        }
        return "";
    }
    //判断y年m月d日是否为节气
    function isSolarTerm(y, m, d) {
        if (getSolarTerm(y, 2 * m - 1) == d) {
            return solarTerms[2 * m - 2];
        } else if (getSolarTerm(y, 2 * m - 2) == d) {
            return solarTerms[2 * m - 1];
        } else {
            return "";
        }
    }
    //计算出y年m月d日的农历详细信息
    function solarTolunar(y, m, d) {
        var offset = (Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31)) / 86400000;
        var yNum = 0,
            year = 1900,
            lYearDays;
        while (year <= 2050) {
            lYearDays = lunarYearDays(year);
            if (offset < lYearDays) {
                break;
            } else{
                offset -= lYearDays;
                yNum++;
                year++;
            }
        }
        var leap = leapMonth(year);
        var month = 1,
            isleap = false;
        var lMonthDays;
        while (month < 13) {
            if (month == (leap + 1) && !isleap) {
                month--;
                isleap = true;
                lMonthDays = leapDays(year);
            } else {
                lMonthDays = lunarMonthDays(year, month);
            }
            if (offset < lMonthDays) break;
            offset -= lMonthDays;
            if (isleap && month == leap + 1) { isleap = false; }
            month++;
        }
        var day = offset + 1;
        var lMonth; //农历月
        if (isleap && month == leap) {
            lMonth = "闰" + nStr2[month - 1] + "月";
        } else {
            lMonth = nStr2[month - 1] + "月";
        }
        var lDay = lunarDay(day); //农历天
        var sTerm = isSolarTerm(y, m, d);
        var i = 0,
            j = 0;
        // 1900年立春后为 庚子年 鼠年
        if (m == 2 && d < getSolarTerm(y, 3) || m < 2) i--; //若非该年立春前则年数减1
        var gzYear = ganZhi(y - 1900 + i + 6, y - 1900 + i);
        var animal1 = animal[(y - 1900 + i + 12) % 12];
        //1900-1-1为丙子月 甲戌日
        if (d < getSolarTerm(y, 2 * m - 1)) j--; //若非该月第一个节气前则月数减1
        var gzMonth = ganZhi((y - 1900) * 12 + m + 2 + j, (y - 1900) * 12 + m + j);
        var dNum = (Date.UTC(y, m - 1, d, 0, 0, 0, 0) - Date.UTC(1900, 0, 1, 0, 0, 0, 0)) / 86400000;
        var gzDay = ganZhi(dNum, dNum + 10);
        var nweek = (dNum + 1) % 7;
        var week = nStr1[nweek];
        nweek = nweek ? nweek : 7;
        var lFest = isLunarFestival(month, day);
        var iFest = isFestival(m,d,Math.floor((d-1)/7)+1,nweek);
        return ({ "year": y, "month": m, "day": d, "lMonth": lMonth, "lDay": lDay, "gzYear": gzYear, "gzMonth": gzMonth, "gzDay": gzDay, "sTerm": sTerm, "animal": animal1, "week": week, "nweek": nweek, "lFest": lFest ,"iFest": iFest});
    }
    //添加表格中节假日信息或节气信息或农历
    function addTips(obj, json) {
        var tip = json.lFest || json.iFest;
        if (tip) {
            obj.innerHTML = tip;
            obj.title = tip;
            obj.className = "red";
        } else if (json.sTerm) {
            obj.innerHTML = json.sTerm;
            obj.className = "solar";
        } else {
            obj.title = "";
            obj.innerHTML = json.lDay == "初一" ? json.lMonth : json.lDay;
        }
    }
    //重新新日历表
    function updateDate(flag) { //flag用于判断是否是返回今天
        var year = document.getElementById("year");
        var month = document.getElementById("month");
        var calTab = document.getElementById("calendarTable");
        var indexY = year.selectedIndex;
        var indexM = month.selectedIndex;
        var y = parseInt(year.options[indexY].innerHTML);
        var m = parseInt(month.options[indexM].innerHTML);
        var date = solarTolunar(y, m, 1);
        //表格中上月部分
        var lastM = (m + 11) % 12;
        lastM = lastM ? lastM : 12;
        var lastY = lastM == 12 ? y - 1 : y;
        var lastMDay = monthDay(lastY, lastM);
        var td = new Date;
        var selectedDay = td.getDate();
        for (var i = 0; i < date.nweek - 1; i++) {
            var c = calTab.children[0].children[1].children[i].children[0];
            var d = lastMDay + i - date.nweek + 2;
            if (c.className.search("selected") > -1 && flag!=1) {
                selectedDay = c.dateInfo.day;
            }
            c.className = "";
            c.dateInfo = solarTolunar(lastY, lastM, d);
            addTips(c.children[1], c.dateInfo);
            c.children[0].innerHTML = d;
            c.children[0].className = "ntm";
            c.children[1].className = "ntm";
        }
        //表格中本月部分
        var mDay = monthDay(y, m);
        var p, q, n, f;
        for (p = 1, n = 1, f = date.nweek - 1; n <= mDay; p++, f = 0) {
            for (q = f; q < 7 && n <= mDay; q++) {
                var c = calTab.children[0].children[p].children[q].children[0];
                if (c.className.search("selected") > -1 && flag!=1) {
                    selectedDay = c.dateInfo.day;
                }
                c.className = "";
                c.children[0].className = "";
                c.children[1].className = "";
                if (q == 5 || q == 6) {
                    c.children[0].className = "red";
                }
                if (n == td.getDate() && m == td.getMonth() + 1 && td.getFullYear() == y) {
                    c.className = "today";
                }
                c.dateInfo = solarTolunar(y, m, n);
                c.children[0].innerHTML = n++;
                addTips(c.children[1], c.dateInfo);
            }
        }
        //表格中下月部分
        var nextM = (m + 1) % 12;
        nextM = nextM ? nextM : 12;
        var nextY = nextM == 1 ? y + 1 : y;
        n = 1;
        for (var i = p - 1, f = q; i <= 6; i++, f = 0) {
            for (var j = f; j < 7; j++) {
                var c = calTab.children[0].children[i].children[j].children[0];
                if (c.className.search("selected") > -1 && flag!=1) {
                    selectedDay = c.dateInfo.day;
                }
                c.className = "";
                c.dateInfo = solarTolunar(nextY, nextM, n);
                addTips(c.children[1], c.dateInfo);
                c.children[0].innerHTML = n++;
                c.children[0].className = "ntm";
                c.children[1].className = "ntm";
            }
        }
        changeSelected(y + "-" + m + "-" + selectedDay);
    }
    //转上一年
    function prevYear() {
        var thisYear = document.getElementById("year");
        var option = thisYear.getElementsByTagName("option");
        var i = thisYear.selectedIndex;
        if (i != 0) {
            option[i - 1].selected = true;
            updateDate();
        }
    }
    //转到下一年
    function nextYear() {
        var thisYear = document.getElementById("year");
        var option = thisYear.getElementsByTagName("option");
        var i = thisYear.selectedIndex;
        if (i != option.length - 1) {
            option[i + 1].selected = true;
            updateDate();
        }
    }
    //转到上个月
    function prevMonth() {
        var thisYear = document.getElementById("year");
        var thisMonth = document.getElementById("month");
        var option1 = thisYear.getElementsByTagName("option");
        var option2 = thisMonth.getElementsByTagName("option")
        var i = thisYear.selectedIndex;
        var j = thisMonth.selectedIndex;
        if (i == 0 && j == 0) return;
        j = j ? j - 1 : 11;
        i = j == 11 ? i - 1 : i;
        option1[i].selected = true;
        option2[j].selected = true;
        updateDate();
    }
    //转到下个月
    function nextMonth() {
        var thisYear = document.getElementById("year");
        var thisMonth = document.getElementById("month");
        var option1 = thisYear.getElementsByTagName("option");
        var option2 = thisMonth.getElementsByTagName("option")
        var i = thisYear.selectedIndex;
        var j = thisMonth.selectedIndex;
        if (i == option1.length - 1 && j == option2.length - 1) return;
        j = j == 11 ? 0 : j + 1;
        i = j ? i : i + 1;
        option1[i].selected = true;
        option2[j].selected = true;
        updateDate();
    }
    var startX, //记录触摸开始的x
        startY, //记录触摸开始的y
        changeX, //记录触摸的x与startX的差
        changeY, //记录触摸的x与startX的差
        touchFlag, //检测是否往返滑动
        touchObj; //记录触摸开始的dom
    //obj模拟event事件
    function simEvent(obj, event) {
        if (/msie/i.test(navigator.uerAgent)) {
            obj.fireEvent("on" + event);
        } else {
            var mouseEvent = document.createEvent("HTMLEvents");
            mouseEvent.initEvent(event, true, false);
            touchObj.dispatchEvent(mouseEvent);
        }
    }
    //触摸开始触发函数
    function touchStartFunc(e) {
        e = e || window.event;
        changeX = 0, changeY = 0, touchFlag = 1;
        var touch = e.targetTouches[0];
        touchObj = touch.target;
        startX = Number(touch.pageX);
        startY = Number(touch.pageY);
        simEvent(touchObj, "mouseout"); //有些浏览器touchstart触发mouseover却没有mouseout
        return false;
    }
    //触摸移动触发函数
    function touchMoveFunc(e) {
        e = e || window.event;
        var touch = e.targetTouches[0];
        var x = Number(touch.pageX);
        var y = Number(touch.pageY);
        var t = (new Date()).getTime();
        changeY = y - startY;
        if (Math.abs(changeX) > Math.abs(x - startX)) { //若往返触摸则不发生反应
            touchFlag = 0;
        } else {
            changeX = x - startX;
        }
    }
    //触摸结束触发函数
    function touchEndFunc(e) {
        e = e || window.event;
        e.preventDefault();
        var table = document.getElementById("calendarTable");
        var tdWidth = table.getElementsByTagName("td")[0].offsetWidth;
        var tdHeight = table.getElementsByTagName("td")[0].offsetHeight;
        if (changeX <= -tdWidth / 2 && Math.abs(changeX) > 2 * Math.abs(changeY) && touchFlag) {
            nextMonth(); //触摸屏左滑动进入下一个月
        } else if (changeX >= tdWidth / 2 && Math.abs(changeX) > 2 * Math.abs(changeY) && touchFlag) {
            prevMonth(); //触摸屏右滑动进入上一个月
        } else if (touchFlag && Math.abs(changeY) <= tdHeight / 2) {
            simEvent(touchObj, "click");
        }
    }
    //返回今天
    function returnToday() {
        var td = new Date();
        var year = document.getElementById("year");
        var month = document.getElementById("month");
        year.children[td.getFullYear() - 1901].selected = true;
        month.children[td.getMonth()].selected = true;
        updateDate(1);
    }
    // 初始化，生成年和月的select及选择当前日期
    (function() {
        var year = document.getElementById("year");
        var month = document.getElementById("month");
        var d = new Date();
        for (var i = 1901; i <= 2050; i++) {
            var option = document.createElement("option")
            option.innerHTML = i + "年"
            if (d.getFullYear() == i) {
                option.selected = true;
            }
            year.appendChild(option);
        }
        for (var i = 1; i <= 12; i++) {
            var option = document.createElement("option")
            option.innerHTML = i + "月"
            if (d.getMonth() + 1 == i) {
                option.selected = true;
            }
            month.appendChild(option);
        }
        updateDate();
    })();
    //给Dom添加监听事件
    function addEvent(obj,event,fuc,bubble){
    	if(document.addEventListener){
            obj.addEventListener(event,fuc,bubble);
    	} else{
    		obj.attachEvent("on" + event,fuc);
    	}
    }
    (function() {
        var year = document.getElementById("year");
        var month = document.getElementById("month");
        var prYear = document.getElementById("prevYear");
        var ntYear = document.getElementById("nextYear");
        var prMonth = document.getElementById("prevMonth");
        var ntMonth = document.getElementById("nextMonth");
        var rtBtn = document.getElementById("rtToday");
        var table = document.getElementById("calendarTable");
        addEvent(year,"change", updateDate, false);
        addEvent(month,"change", updateDate, false);
        addEvent(rtBtn,"click", returnToday, false);
        addEvent(prYear,"click", prevYear, false);
        addEvent(ntYear,"click", nextYear, false);
        addEvent(prMonth,"click", prevMonth, false);
        addEvent(ntMonth,"click", nextMonth, false);
        addEvent(table,"click", tdMouseFuc, false);
        addEvent(table,"mouseover", tdMouseFuc, false);
        addEvent(table,"mouseout", tdMouseFuc, false);
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            addEvent(table,"touchstart", touchStartFunc, false);
            addEvent(table,"touchmove", touchMoveFunc, false);
            addEvent(table,"touchend", touchEndFunc, false);
        }
    })();
})();
