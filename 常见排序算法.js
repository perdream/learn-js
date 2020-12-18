let arr = [8, 12, 7, 1, 26, 45, 33, 2, 2]

// /*
//     冒泡排序(相邻元素对比，交换位置)
// */
// function bubbleSort(arr) {
//     for (var i = 0, len = arr.length; i < len; i++) {
//         for (var j = 0; j < len - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
//             }
//         }
//     }
//     return arr
// }
// //测试
// console.log(bubbleSort(arr))

// /**
//  * 选择排序
//  * 算法：选择第一个元素为最小元素去跟后面元素比较，如果比它更小，则交换位置
//  */
// function selectionSort(arr) {
//     let minindex;
//     for (var i = 0, len = arr.length; i < len - 1; i++) {
//         minindex = i;
//         //每一轮循环都找出最小的
//         for (var j = i + 1; j < len; j++) {
//             if (arr[j] < arr[minindex]) {
//                 minindex = j
//             }
//         }
//         [arr[i], arr[minindex]] = [arr[minindex], arr[i]]
//     }
//     return arr
// }
// //测试
// console.log(selectionSort(arr))


/**
 * 插入排序
 * 算法：从第一个元素开始，该元素可以认为已经被排序；取出下一个元素，在已经排序的元素序列中从后向前扫描；如果该元素（已排序）大于新元素，
 * 将该元素移到下一位置；重复次步骤，直到找到已排序的元素小于或者等于新元素的位置；将新元素插入到该位置后；
 */
// let arr = [8, 12, 7, 1, 26, 45, 33, 2, 2]
// function insertionSort(arr) {
//     for (var i = 1; i < arr.length; i++) {
//         var key = arr[i];
//         var j = i - 1;
//         while (j >= 0 && arr[j] > key) {
//             [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
//             j--
//         }
//     }
//     return arr;
// }
// //测试
// console.log(insertionSort(arr))


/**
 * 快速排序
 * 算法：在数据集之中，选择一个元素作为”基准”（pivot）。所有小于”基准”的元素，都移到”基准”的左边；
 * 所有大于”基准”的元素，都移到”基准”的右边。对”基准”左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 */
// function quickSort(arr) {
//     if (arr.length <= 1) {
//         return arr
//     };
//     var pivotIndex = Math.floor(arr.length / 2);
//     var pivot = arr.splice(pivotIndex, 1)[0];
//     var left = [];
//     var right = [];
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] < pivot) {
//             left.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }
//     return quickSort(left).concat([pivot], quickSort(right));
// }
// //测试
// console.log(quickSort(arr))



/**
 * 二分法排序
 * 算法：在插入第i个元素时，对前面的0～i-1元素进行折半，先跟他们中间的那个元素比，如果小，则对前半再进行折半，否则对后半 进行折半，直到left>right，然后再把第i个元素前1位与目标位置之间的所有元素后移，再把第i个元素放在目标位置上，二分法排序最重要的一个步骤就是查找要插入元素的位置，也就是要在哪一个位置上放我们要准备排序的这个元素。当我们查找到位置以后就很好说了，和插入排序一样，将这个位置以后的所有元素都向后移动一位。这样就实现了二分法排序。
 * 然后是怎么查找着一个位置呢，就是不断的比较已排序的序列中的中间元素和要排序元素，如果大于的话，说明这个要排序的元素在已排序序列中点之前的序列。
 */
function twoSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var key = arr[i],
            left = 0,
            right = i - 1;
        while (left <= right) {
            var middle = parseInt((left + right) / 2);
            if (key < arr[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        for (var j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = key;
    }
    return arr;
}